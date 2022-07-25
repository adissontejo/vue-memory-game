import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

import {
  onGameState,
  pushGame,
  pushPlayer,
  removePlayer,
  setGameState,
} from '@/services/games';
import { GameState, Player } from '@/types';

import { useCards } from './cards';
import { usePlayers } from './players';

export const useGameStore = defineStore('game', () => {
  const gameId = ref<string | null>(null);
  const gameState = ref<GameState>('waiting');
  const player = ref<Partial<Player & { creator: boolean }>>({});
  const turn = ref<string>('');

  const playersStore = usePlayers(gameId);
  const cardStore = useCards(gameId, gameState);

  watch(gameId, () => {
    if (!gameId.value) {
      return;
    }

    onGameState(gameId.value, state => {
      gameState.value = state;
    });
  });

  const reset = () => {
    playersStore.reset();
    cardStore.reset();

    gameId.value = null;
    gameState.value = 'waiting';
    player.value = {};
    turn.value = '';
  };

  const createGame = async (creatorName: string) => {
    const data = await pushGame(creatorName);

    if (!data.gameId || !data.creatorId) {
      return null;
    }

    gameId.value = data.gameId;

    player.value = {
      id: data.creatorId,
      name: creatorName,
      score: 0,
      creator: true,
    };

    return data.gameId;
  };

  const joinGame = async (id: string, playerName: string) => {
    const playerId = await pushPlayer(id, playerName);

    if (!playerId) {
      return;
    }

    gameId.value = id;

    player.value = {
      id: playerId,
      name: playerName,
      score: 0,
    };
  };

  const leaveGame = async () => {
    if (!gameId.value || !player.value?.id) {
      return;
    }

    await removePlayer(gameId.value, player.value.id);

    reset();
  };

  const startGame = async () => {
    if (!gameId.value) {
      return;
    }

    await setGameState(gameId.value, 'in-progress');
  };

  return {
    gameId,
    gameState,
    player,
    turn,
    ...playersStore,
    ...cardStore,
    reset,
    createGame,
    joinGame,
    leaveGame,
    startGame,
  };
});
