import { child, onChildAdded, onChildRemoved, ref } from '@firebase/database';

import { Player } from '@/types';

import { games } from './base';

export const onPlayerJoined = (
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

export const onPlayerLeft = (
  gameId: string,
  callback: (playerId: string) => void
) => {
  const game = child(games, `/-${gameId}`);

  const players = child(game, '/players');

  onChildRemoved(players, snapshot => {
    callback(snapshot.key?.substring(1) || '');
  });
};
