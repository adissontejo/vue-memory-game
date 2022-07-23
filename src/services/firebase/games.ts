import { onChildAdded, push, ref, set } from '@firebase/database';

import { Player } from '@/types';

import { db } from './config';

export const games = ref(db, '/games');

export const createGame = async () => {
  const game = push(games);

  await set(game, {
    players: [],
  });

  return game.key || '';
};

export const joinGame = async (gameId: string, playerName: string) => {
  const players = ref(db, `/games/${gameId}/players`);

  const player = push(players);

  await set(player, {
    name: playerName,
    score: 0,
  });

  return player.key || '';
};

export const onPlayerJoined = (
  gameId: string,
  callback: (player: Player) => void
) => {
  const game = ref(db, `/games/${gameId}`);

  onChildAdded(game, snapshot => {
    const value = snapshot.val() as Record<string, Player>;

    const key = Object.keys(value)[0];

    const player = value[key];

    callback({
      ...player,
      id: key,
    });
  });
};
