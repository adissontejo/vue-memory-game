import {
  child,
  get,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
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

export const setTurn = async (gameId: string, playerId: string) => {
  const game = child(games, `/-${gameId}`);

  const turn = child(game, '/turn');

  await set(turn, playerId);
};

export const onTurn = (
  gameId: string,
  callback: (playerId: string) => void
) => {
  const game = child(games, `/-${gameId}`);

  const turn = child(game, '/turn');

  onValue(turn, snapshot => {
    callback(snapshot.val());
  });
};

export const setPlayerScore = async (
  gameId: string,
  playerId: string,
  value: number
) => {
  const game = child(games, `/-${gameId}`);

  const players = child(game, '/players');

  const player = child(players, `/-${playerId}`);

  const score = child(player, '/score');

  await set(score, value);
};

export const onPlayerScoreChanged = (
  gameId: string,
  callback: (playerId: string, score: number) => void
) => {
  const game = child(games, `/-${gameId}`);

  const players = child(game, '/players');

  onChildChanged(players, snapshot => {
    if (!snapshot.key) {
      return;
    }

    const score = snapshot.child('/score');

    callback(snapshot.key.substring(1), score.val());
  });
};
