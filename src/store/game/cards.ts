import { Ref, ref, watch } from 'vue';

import {
  pushSelectedCard,
  onCards,
  onSelectedCardAdded,
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
    if (!gameId.value) {
      return;
    }

    await pushSelectedCard(gameId.value, cardIndex);
  };

  watch(gameId, () => {
    if (!gameId.value) {
      return;
    }

    onCards(gameId.value, data => {
      cards.value = data;
    });
  });

  watch(gameState, () => {
    console.log('in');

    if (!gameId.value || gameState.value !== 'in-progress') {
      return;
    }

    onSelectedCardAdded(gameId.value, index => {
      selectedCards.value.push(index);
    });
  });

  return {
    cards,
    selectedCards,
    reset,
    selectCard,
  };
};
