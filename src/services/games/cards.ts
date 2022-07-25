import {
  child,
  onChildAdded,
  onChildChanged,
  onValue,
  set,
} from '@firebase/database';

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

export const setSelectedCards = async (gameId: string, value: number[]) => {
  const game = child(games, `/-${gameId}`);

  const selected = child(game, '/selected');

  await set(
    selected,
    value.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.toString()]: true,
      };
    }, {})
  );
};

export const onSelectedCards = (
  gameId: string,
  callback: (selectedCards: number[]) => void
) => {
  const game = child(games, `/-${gameId}`);

  const selected = child(game, '/selected');

  onValue(selected, snapshot => {
    const value = snapshot.val() || ({} as Record<string, boolean>);

    callback(Object.keys(value).map(item => parseInt(item)));
  });
};

export const setCardFound = async (gameId: string, cardIndex: number) => {
  const game = child(games, `/-${gameId}`);

  const cards = child(game, '/cards');

  const card = child(cards, `/${cardIndex}`);

  const found = child(card, '/found');

  await set(found, true);
};

export const onCardFound = async (
  gameId: string,
  callback: (cardIndex: number) => void
) => {
  const game = child(games, `/-${gameId}`);

  const cards = child(game, '/cards');

  onChildChanged(cards, snapshot => {
    const card = snapshot.val() as Card;

    if (snapshot.key && card.found) {
      callback(parseInt(snapshot.key));
    }
  });
};
