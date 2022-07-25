import { child, onChildAdded, onValue, set } from '@firebase/database';

import { Card } from '@/types';

import { games } from './base';

export const onCards = (gameId: string, callback: (cards: Card[]) => void) => {
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

export const pushSelectedCard = async (gameId: string, cardIndex: number) => {
  const game = child(games, `/-${gameId}`);

  const selected = child(game, '/selected');

  const card = child(selected, `/${cardIndex}`);

  await set(card, true);
};

export const onSelectedCardAdded = (
  gameId: string,
  callback: (cardIndex: number) => void
) => {
  const game = child(games, `/-${gameId}`);

  const selected = child(game, '/selected');

  onChildAdded(selected, snapshot => {
    if (!snapshot.key) {
      return;
    }

    const cardIndex = parseInt(snapshot.key);

    callback(cardIndex);
  });
};
