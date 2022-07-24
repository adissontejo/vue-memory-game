import { defineStore } from 'pinia';

import { createGame, joinGame, onPlayerJoined } from '@/services/firebase';
import { Game, Player } from '@/types';

export type GameState = {
  game?: Game;
};

export const useGameStore = defineStore('game', {
  state: () => ({
    id: '',
    players: [] as Player[],
    player: {} as Player,
  }),

  getters: {},

  actions: {
    async createGame(creatorName: string) {
      const { gameId, creatorId } = await createGame(creatorName);

      if (!gameId || !creatorId) {
        return null;
      }

      this.id = gameId;
      this.player = {
        id: creatorId,
        name: creatorName,
        score: 0,
      };

      onPlayerJoined(gameId, player => {
        this.players.push(player);
      });

      return gameId;
    },

    async joinGame(gameId: string, playerName: string) {
      const playerId = await joinGame(gameId, playerName);

      if (!playerId) {
        return null;
      }

      this.id = gameId;

      onPlayerJoined(gameId, player => {
        this.players.push(player);
      });

      return playerId;
    },
  },
});
