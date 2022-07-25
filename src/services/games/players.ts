import {
  child,
  get,
  onChildAdded,
  onChildRemoved,
  push,
  ref,
  remove,
  set,
} from '@firebase/database';

import { Player } from '@/types';

import { games } from './base';

export const pushPlayer = async (gameId: string, playerName: string) => {
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

export const removePlayer = async (gameId: string, playerId: string) => {
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

export const onPlayerAdded = (
  gameId: string,
  callback: (player: Player) => void
) => {
  const game = child(games, `/-${gameId}`);

  const players = child(game, '/players');

  onChildAdded(players, snapshot => {
    const value = snapshot.val() as Player;

    callback({
      ...value,
      id: snapshot.key?.substring(1) || '',
    });
  });
};

export const onPlayerRemoved = (
  gameId: string,
  callback: (playerId: string) => void
) => {
  const game = child(games, `/-${gameId}`);

  const players = child(game, '/players');

  onChildRemoved(players, snapshot => {
    callback(snapshot.key?.substring(1) || '');
  });
};
