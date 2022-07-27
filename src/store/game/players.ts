import { computed, Ref, ref } from 'vue';

import { useSocket } from '@/store/socket';
import { Game, Player } from '@/types';

export const usePlayers = (gameId: Ref<string | null>) => {
  const socket = useSocket();

  const players = ref<Player[]>([]);
  const turn = ref<string>('');

  const playingNow = computed(() => {
    return players.value.find(item => item.id === turn.value);
  });

  socket.onPlayerJoined(player => {
    players.value.push(player);
  });

  socket.onPlayerLeft(playerId => {
    const index = players.value.findIndex(item => item.id === playerId);

    if (index === -1) {
      return;
    }

    players.value.splice(index, 1);
  });

  const update = (game: Game) => {
    players.value = game.players;
    turn.value = game.turn;
  };

  const incrementScore = async (id: string) => {
    if (!gameId.value) {
      return;
    }

    const playerIndex = players.value.findIndex(item => item.id === id);

    players.value[playerIndex].score++;
  };

  return {
    players,
    playingNow,
    turn,
    update,
    incrementScore,
  };
};
