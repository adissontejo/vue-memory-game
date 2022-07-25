import { child, onValue } from '@firebase/database';

import { Card } from '@/types';

import { games } from './base';

export const onCardsAdded = (
  gameId: string,
  callback: (cards: Card[]) => void
) => {
  const game = child(games, `/-${gameId}`);

  const cards = child(game, '/cards');

  onValue(
    cards,
    snapshot => {
      const memoryCards = [] as Card[];

      for (let i = 0; i < snapshot.size; i++) {
        const card = snapshot.child(`/${i}`).val();

        memoryCards.push(card);
      }

      callback(memoryCards);
    },
    { onlyOnce: true }
  );
};
