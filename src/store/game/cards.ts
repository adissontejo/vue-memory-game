import { Ref, ref, watch } from 'vue';

import {
  onCardFound,
  onCards,
  onSelectedCards,
  setCardFound,
  setSelectedCards,
} from '@/services/games';
import { Card, GameState } from '@/types';

export const useCards = (
  gameId: Ref<string | null>,
  gameState: Ref<GameState>
) => {
  const cards = ref<Card[]>([]);
  const selectedCards = ref<number[]>([]);

  const reset = () => {
    cards.value = [];
    selectedCards.value = [];
  };

  const selectCard = async (cardIndex: number) => {
    if (!gameId.value || selectedCards.value.length >= 2) {
      return;
    }

    if (selectedCards.value.includes(cardIndex)) {
      return;
    }

    await setSelectedCards(gameId.value, [...selectedCards.value, cardIndex]);
  };

  const checkPair = async () => {
    if (!gameId.value) {
      return;
    }

    const cardA = selectedCards.value[0];
    const cardB = selectedCards.value[1];

    if (cards.value[cardA].color === cards.value[cardB].color) {
      await setCardFound(gameId.value, cardA);
      await setCardFound(gameId.value, cardB);

      await setSelectedCards(gameId.value, []);

      return true;
    }

    await new Promise<void>(resolve => {
      setTimeout(async () => {
        if (!gameId.value) {
          return;
        }

        await setSelectedCards(gameId.value, []);

        resolve();
      }, 500);
    });

    return false;
  };

  watch(gameState, () => {
    if (!gameId.value || gameState.value !== 'in-progress') {
      return;
    }

    onCards(gameId.value, data => {
      cards.value = data;
    });

    onSelectedCards(gameId.value, data => {
      selectedCards.value = data;
    });

    onCardFound(gameId.value, cardIndex => {
      cards.value[cardIndex].found = true;
    });
  });

  return {
    cards,
    selectedCards,
    reset,
    selectCard,
    checkPair,
  };
};
