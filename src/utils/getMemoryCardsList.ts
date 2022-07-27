import { cards } from '@/data';

import { getRandom } from './getRandom';

export const getMemoryCardsList = () => {
  const available = cards.reduce((acc, curr) => {
    return [...acc, curr, curr];
  }, [] as string[]);

  const memoryCards = [];

  while (available.length > 0) {
    const selected = getRandom(0, available.length);

    const [card] = available.splice(selected, 1);

    memoryCards.push({
      value: card,
      found: false,
    });
  }

  return memoryCards;
};
