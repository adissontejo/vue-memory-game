import { ref } from 'vue';

import { GameState } from '@/types';
import { getMemoryCardsList, sfx } from '@/utils';

export const useLocal = () => {
  const cards = ref(getMemoryCardsList());
  const selectedCards = ref<number[]>([]);
  const attempts = ref(0);
  const gameState = ref<GameState>('in-progress');

  const selectCard = (index: number) => {
    if (
      selectedCards.value.includes(index) ||
      selectedCards.value.length === 2 ||
      cards.value[index].found
    ) {
      return;
    }

    sfx.flip();

    selectedCards.value.push(index);

    if (selectedCards.value.length === 2) {
      attempts.value++;

      const cardA = cards.value[selectedCards.value[0]];
      const cardB = cards.value[selectedCards.value[1]];

      if (cardA.value !== cardB.value) {
        setTimeout(() => {
          selectedCards.value = [];
        }, 1000);
      } else {
        cardA.found = true;
        cardB.found = true;

        setTimeout(() => {
          selectedCards.value = [];

          sfx.hit();
        }, 200);
      }
    }
  };

  return {
    cards,
    selectedCards,
    attempts,
    gameState,
    selectCard,
  };
};
