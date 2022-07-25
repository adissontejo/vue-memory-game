import { child, get, onValue, push, remove, set } from '@firebase/database';

import { GameState, Player } from '@/types';
import { getMemoryCardsList } from '@/utils';

import { games } from './base';

export const pushGame = async (creatorName: string) => {
  const game = push(games);

  const players = child(game, '/players');

  const creator = push(players);

  const cards = getMemoryCardsList();

  await set(game, {
    creatorId: creator.key,
    players: {
      [creator.key as string]: {
        name: creatorName,
        score: 0,
      },
    },
    cards,
    state: 'waiting',
    turn: '',
    selected: {},
  });

  window.addEventListener('beforeunload', () => remove(game));

  return {
    gameId: game.key?.substring(1) || null,
    creatorId: creator.key?.substring(1) || null,
  };
};

export const setGameState = async (gameId: string, newState: GameState) => {
  const game = child(games, `/-${gameId}`);

  const state = child(game, '/state');

  await set(state, newState);
};

export const onGameState = (
  gameId: string,
  callback: (state: GameState) => void
) => {
  const game = child(games, `/-${gameId}`);

  const state = child(game, '/state');

  onValue(state, snapshot => {
    callback(snapshot.val());
  });
};

export * from './players';
export * from './cards';
