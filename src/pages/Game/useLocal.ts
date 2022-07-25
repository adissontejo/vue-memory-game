import { computed, ref } from 'vue';

import { getMemoryCardsList } from '@/utils';

export const useLocal = () => {
  const cards = ref(getMemoryCardsList());
  const selected = ref<number[]>([]);
  const attempts = ref(0);

  const selectCard = (index: number) => {
    if (selected.value.includes(index) || selected.value.length === 2) {
      return;
    }

    selected.value.push(index);

    if (selected.value.length === 2) {
      attempts.value++;

      const cardA = cards.value[selected.value[0]];
      const cardB = cards.value[selected.value[1]];

      if (cardA.color !== cardB.color) {
        setTimeout(() => {
          selected.value = [];
        }, 1000);
      } else {
        cardA.found = true;
        cardB.found = true;

        selected.value = [];
      }
    }
  };

  return {
    cards,
    selected,
    attempts,
    selectCard,
  };
};
