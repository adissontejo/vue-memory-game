import { child, get, onChildAdded, push, ref, set } from '@firebase/database';

import { Player } from '@/types';

import { db } from './config';

export const games = ref(db, '/games');

export const createGame = async (creatorName: string) => {
  const game = push(games);

  const players = child(game, '/players');

  const creator = push(players);

  set(game, {
    creatorId: creator.key,
    players: {
      [creator.key as string]: {
        name: creatorName,
        score: 0,
      },
    },
    state: 'waiting',
  });

  return {
    gameId: game.key?.substring(1) || null,
    creatorId: creator.key?.substring(1) || null,
  };
};

export const joinGame = async (gameId: string, playerName: string) => {
  const game = child(games, `/-${gameId}`);

  const gameSnapshot = await get(game);

  if (!gameSnapshot.exists()) {
    return null;
  }

  const players = child(game, `/players`);

  const player = push(players);

  await set(player, {
    name: playerName,
    score: 0,
  });

  return player.key?.substring(1) || null;
};

export const onPlayerJoined = (
  gameId: string,
  callback: (player: Player) => void
) => {
  const game = child(games, `/-${gameId}`);

  const players = child(game, '/players');

  onChildAdded(players, snapshot => {
    const value = snapshot.val() as Player;

    console.log(value);

    callback({
      ...value,
      id: snapshot.key?.substring(1) || '',
    });
  });
};
