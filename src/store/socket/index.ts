import { ref } from 'vue';
import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';

export const useSocket = defineStore('socket', () => {
  const socket = ref<Socket>();

  const connect = () => {
    if (socket.value) {
      return;
    }

    socket.value = io('http://localhost:3333');
  };

  const emit = (event: string, ...args: any[]) => {
    socket.value?.emit(event, ...args);
  };

  const on = (event: string, callback: (...args: any[]) => void) => {
    socket.value?.on(event, callback);
  };

  return {
    connect,
    emit,
    on,
  };
});
