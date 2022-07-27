import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useSocket } from '@/store/socket';
import { GameState, Player } from '@/types';
import { sfx } from '@/utils';

import { useCards } from './cards';
import { usePlayers } from './players';

export const useGameStore = defineStore('game', () => {
  const socket = useSocket();

  const gameId = ref<string | null>(null);
  const gameState = ref<GameState>('waiting');
  const player = ref<Partial<Player & { creator: boolean }>>({});

  const playersStore = usePlayers(gameId);
  const cardStore = useCards(gameId);

  socket.onGameStarted(() => {
    gameState.value = 'in-progress';
  });

  socket.onRightAnswer((player, cards) => {
    sfx.hit();

    playersStore.incrementScore(player);
    cardStore.findPair(cards[0], cards[1]);
  });

  socket.onWrongAnswer(turn => {
    setTimeout(() => {
      playersStore.turn.value = turn;
      cardStore.emptySelection();
    }, 1000);
  });

  socket.onGameFinished(() => {
    setTimeout(() => {
      gameState.value = 'finished';
    }, 500);
  });

  const createGame = async (creatorName: string) => {
    const game = await socket.createGame(creatorName);

    gameId.value = game.id;
    gameState.value = game.state;
    player.value = {
      ...game.players[0],
      creator: true,
    };

    playersStore.update(game);
    cardStore.update(game);

    return game.id;
  };

  const joinGame = async (id: string, playerName: string) => {
    const response = await socket.joinGame(id, playerName);

    gameId.value = response.game.id;
    gameState.value = response.game.state;
    player.value = response.player;

    playersStore.update(response.game);
    cardStore.update(response.game);
  };

  const leaveGame = async () => {
    if (!gameId.value || !player.value?.id) {
      return;
    }
  };

  const startGame = async () => {
    if (!gameId.value || !player.value.id) {
      return;
    }

    socket.startGame(gameId.value);
  };

  return {
    gameId,
    gameState,
    player,
    ...playersStore,
    ...cardStore,
    createGame,
    joinGame,
    leaveGame,
    startGame,
  };
});
