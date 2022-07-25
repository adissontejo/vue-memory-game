import { child, get, push, remove, set } from '@firebase/database';

import { Player } from '@/types';
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
  });

  window.addEventListener('beforeunload', () => remove(game));

  return {
    gameId: game.key?.substring(1) || null,
    creatorId: creator.key?.substring(1) || null,
  };
};

export const joinGame = async (gameId: string, playerName: string) => {
  const game = child(games, `/-${gameId}`);

  const gameState = await get(child(game, '/state'));

  if (!gameState.exists()) {
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

export * from './players';
export * from './cards';
