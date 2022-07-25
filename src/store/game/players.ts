import { Ref, ref, watch } from 'vue';

import { onPlayerAdded, onPlayerRemoved } from '@/services/games';
import { Player } from '@/types';

export const usePlayers = (gameId: Ref<string | null>) => {
  const players = ref<Player[]>([]);

  const reset = () => {
    players.value = [];
  };

  watch(gameId, () => {
    if (!gameId.value) {
      return;
    }

    onPlayerAdded(gameId.value, data => {
      players.value.push(data);
    });

    onPlayerRemoved(gameId.value, id => {
      const playerIndex = players.value.findIndex(item => item.id === id);

      players.value.splice(playerIndex, 1);
    });
  });

  return {
    players,
    reset,
  };
};
