import { defineStore } from 'pinia';

import {
  createGame,
  joinGame,
  leaveGame,
  onCardsAdded,
  onPlayerJoined,
  onPlayerLeft,
} from '@/services/games';
import { Card, Player } from '@/types';

export const useGameStore = defineStore('game', {
  state: () => ({
    id: '',
    players: [] as Player[],
    player: {} as Player & {
      created?: boolean;
    },
    cards: [] as Card[],
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
        created: true,
      };

      this.watchPlayers(gameId);
      this.watchCards(gameId);

      return gameId;
    },

    async joinGame(gameId: string, playerName: string) {
      const playerId = await joinGame(gameId, playerName);

      if (!playerId) {
        return null;
      }

      this.id = gameId;
      this.player = {
        id: playerId,
        name: playerName,
        score: 0,
      };

      this.watchPlayers(gameId);
      this.watchCards(gameId);

      return playerId;
    },

    async leaveGame() {
      if (!this.player.id) {
        return;
      }

      await leaveGame(this.id, this.player.id);

      this.id = '';
      this.players = [];
      this.player = {} as Player;
      this.cards = [];
    },

    watchPlayers(gameId: string) {
      this.players = [];

      onPlayerJoined(gameId, player => {
        this.players.push(player);
      });

      onPlayerLeft(gameId, playerId => {
        const playerIndex = this.players.findIndex(
          item => item.id === playerId
        );

        this.players.splice(playerIndex, 1);
      });
    },

    watchCards(gameId: string) {
      this.cards = [];

      onCardsAdded(gameId, cards => {
        this.cards = cards;
      });
    },
  },
});
