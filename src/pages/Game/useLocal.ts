import { computed, ref } from 'vue';

import { getMemoryCardsList } from '@/utils';

export const useLocal = () => {
  const cards = ref(getMemoryCardsList());
  const selectedCards = ref<number[]>([]);
  const attempts = ref(0);

  const selectCard = (index: number) => {
    if (
      selectedCards.value.includes(index) ||
      selectedCards.value.length === 2
    ) {
      return;
    }

    selectedCards.value.push(index);

    if (selectedCards.value.length === 2) {
      attempts.value++;

      const cardA = cards.value[selectedCards.value[0]];
      const cardB = cards.value[selectedCards.value[1]];

      if (cardA.color !== cardB.color) {
        setTimeout(() => {
          selectedCards.value = [];
        }, 1000);
      } else {
        cardA.found = true;
        cardB.found = true;

        selectedCards.value = [];
      }
    }
  };

  return {
    cards,
    selectedCards,
    attempts,
    selectCard,
  };
};
