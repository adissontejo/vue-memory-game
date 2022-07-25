import { child, get, onValue, push, remove, set } from '@firebase/database';

import { GameState, Player } from '@/types';
import { getMemoryCardsList } from '@/utils';

import { games } from './base';

export const createGame = async (creatorName: string) => {
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

export const joinGame = async (gameId: string, playerName: string) => {
  const game = child(games, `/-${gameId}`);

  const state = await get(child(game, '/state'));

  if (!state.exists()) {
    return null;
  }

  const players = child(game, `/players`);

  const player = push(players);

  await set(player, {
    name: playerName,
    score: 0,
  });

  window.addEventListener('beforeunload', () => remove(player));

  return player.key?.substring(1) || null;
};

export const leaveGame = async (gameId: string, playerId: string) => {
  const game = child(games, `/-${gameId}`);

  const creatorId = await get(child(game, '/creatorId'));

  const players = child(game, '/players');

  const player = child(players, `/-${playerId}`);

  if (creatorId.val() === `-${playerId}`) {
    await remove(game);
  } else {
    await remove(player);
  }
};

export const setGameState = async (gameId: string, newState: GameState) => {
  const game = child(games, `/-${gameId}`);

  const state = child(game, '/state');

  await set(state, newState);
};

export const onGameStateChanged = (
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
