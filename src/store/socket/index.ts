import { ref } from 'vue';
import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';

import { Game, Player } from '@/types';

export const useSocket = defineStore('socket', () => {
  const socket = ref<Socket>();

  const connect = () => {
    if (socket.value) {
      return;
    }

    socket.value = io(process.env.VUE_APP_API_URL);
  };

  const emit = (event: string, ...args: any[]) => {
    socket.value?.emit(event, ...args);
  };

  const on = (event: string, callback: (...args: any[]) => void) => {
    socket.value?.on(event, callback);
  };

  const once = (event: string, callback: (...args: any[]) => void) => {
    socket.value?.once(event, callback);
  };

  const createGame = (creatorName: string) =>
    new Promise<Game>(resolve => {
      emit('create-game', creatorName);

      once('created-game', (game: Game) => {
        resolve(game);
      });
    });

  const joinGame = (gameId: string, playerName: string) =>
    new Promise<{ game: Game; player: Player }>(resolve => {
      emit('join-game', gameId, playerName);

      once('joined-game', (game: Game, player: Player) => {
        resolve({ game, player });
      });
    });

  const startGame = (gameId: string) => {
    emit('start-game', gameId);
  };

  const selectCard = (gameId: string, cardIndex: number) => {
    emit('select-card', gameId, cardIndex);
  };

  const onPlayerJoined = (callback: (player: Player) => void) => {
    on('join-game', player => {
      callback(player);
    });
  };

  const onPlayerLeft = (callback: (playerId: string) => void) => {
    on('leave-game', playerId => {
      callback(playerId);
    });
  };

  const onGameStarted = (callback: () => void) => {
    on('start-game', callback);
  };

  const onCardSelected = (callback: (cardIndex: number) => void) => {
    on('select-card', callback);
  };

  const onRightAnswer = (
    callback: (player: string, cards: [number, number]) => void
  ) => {
    on('right-answer', callback);
  };

  const onWrongAnswer = (callback: (turn: string) => void) => {
    on('wrong-answer', callback);
  };

  const onGameFinished = (callback: () => void) => {
    on('finish-game', callback);
  };

  return {
    connect,
    emit,
    on,
    createGame,
    joinGame,
    startGame,
    selectCard,
    onPlayerJoined,
    onPlayerLeft,
    onGameStarted,
    onCardSelected,
    onRightAnswer,
    onWrongAnswer,
    onGameFinished,
  };
});
