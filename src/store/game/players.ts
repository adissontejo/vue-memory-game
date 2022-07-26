import { computed, Ref, ref, watch } from 'vue';

import {
  onPlayerAdded,
  onPlayerRemoved,
  onPlayerScoreChanged,
  onTurn,
  setPlayerScore,
  setTurn,
} from '@/services/games';
import { Player } from '@/types';
import { sfx } from '@/utils';

export const usePlayers = (
  gameId: Ref<string | null>,
  gameState: Ref<string>
) => {
  const players = ref<Player[]>([]);
  const turn = ref<string>('');

  const playingNow = computed(() => {
    return players.value.find(item => item.id === turn.value);
  });

  const reset = () => {
    players.value = [];
  };

  const nextPlayer = async () => {
    if (!gameId.value) {
      return;
    }

    const current = players.value.findIndex(item => turn.value === item.id);

    const next = (current + 1) % players.value.length;

    await setTurn(gameId.value, players.value[next].id);
  };

  const incrementScore = async () => {
    if (!gameId.value || !playingNow.value) {
      return;
    }

    await setPlayerScore(
      gameId.value,
      playingNow.value.id,
      playingNow.value.score + 1
    );
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

  watch(gameState, () => {
    if (!gameId.value || gameState.value !== 'in-progress') {
      return;
    }

    onTurn(gameId.value, playerId => {
      turn.value = playerId;
    });

    onPlayerScoreChanged(gameId.value, (playerId, score) => {
      const playerIndex = players.value.findIndex(item => item.id === playerId);

      players.value[playerIndex].score = score;

      sfx.hit();
    });
  });

  return {
    players,
    playingNow,
    turn,
    reset,
    nextPlayer,
    incrementScore,
  };
};
