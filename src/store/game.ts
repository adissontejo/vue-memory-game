import { defineStore } from 'pinia';

import {
  createGame,
  joinGame,
  leaveGame,
  onCardsAdded,
  onCardSelected,
  onGameStateChanged,
  onPlayerJoined,
  onPlayerLeft,
  selectCard,
  setGameState,
} from '@/services/games';
import { Card, GameState, Player } from '@/types';

export const useGameStore = defineStore('game', {
  state: () => ({
    id: '',
    players: [] as Player[],
    player: {} as Player & {
      created?: boolean;
    },
    cards: [] as Card[],
    state: '' as GameState,
    turn: '',
    selected: [] as number[],
  }),

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
      this.watchGame(gameId);

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
      this.watchGame(gameId);

      return playerId;
    },

    async leaveGame() {
      if (!this.player.id) {
        return;
      }

      await leaveGame(this.id, this.player.id);

      this.$reset();
    },

    async startGame() {
      await setGameState(this.id, 'in-progress');
    },

    async selectCard(cardIndex: number) {
      await selectCard(this.id, cardIndex);
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

    watchGame(gameId: string) {
      this.state = 'waiting';
      this.turn = '';
      this.selected = [];

      onGameStateChanged(gameId, state => {
        this.state = state;
      });

      onCardSelected(gameId, cardIndex => {
        this.selected.push(cardIndex);
      });
    },
  },
});
