import { computed, Ref, ref } from 'vue';

import { useSocket } from '@/store/socket';
import { Card, Game } from '@/types';
import { sfx } from '@/utils';

export const useCards = (gameId: Ref<string | null>) => {
  const socket = useSocket();

  const cards = ref<Card[]>([]);
  const selectedCards = ref<number[]>([]);

  const cardsLefting = computed(() => {
    return cards.value.filter(item => !item.found).length;
  });

  socket.onCardSelected(cardIndex => {
    if (selectedCards.value.includes(cardIndex)) {
      return;
    }

    sfx.flip();

    selectedCards.value.push(cardIndex);
  });

  const update = (game: Game) => {
    cards.value = game.cards;
    selectedCards.value = game.selectedCards;
  };

  const selectCard = (cardIndex: number) => {
    if (!gameId.value || selectedCards.value.length >= 2) {
      return;
    }

    if (
      selectedCards.value.includes(cardIndex) ||
      cards.value[cardIndex].found
    ) {
      return;
    }

    sfx.flip();

    selectedCards.value.push(cardIndex);

    socket.selectCard(gameId.value, cardIndex);
  };

  const emptySelection = () => {
    selectedCards.value = [];
  };

  const findPair = (cardA: number, cardB: number) => {
    cards.value[cardA].found = true;
    cards.value[cardB].found = true;

    emptySelection();
  };

  return {
    cards,
    cardsLefting,
    selectedCards,
    update,
    emptySelection,
    selectCard,
    findPair,
  };
};
