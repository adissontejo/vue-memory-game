import { Module } from 'vuex';

import { createGame, joinGame, onPlayerJoined } from '@/services/firebase';
import { Game, Player } from '@/types';

export type GameState = {
  game?: Game;
};

export const game: Module<GameState, GameState> = {
  state: {},

  getters: {},

  mutations: {
    setGame: (state, game: Game) => {
      state.game = game;
    },

    addPlayer: (state, player: Player) => {
      state.game?.players.push(player);
    },
  },

  actions: {
    createGame: async ({ commit, dispatch }, playerName: string) => {
      const gameId = await createGame();

      commit('setGame', {
        id: gameId,
        players: [],
      } as Game);

      onPlayerJoined(gameId, player => {
        commit('addPlayer', player);
      });

      dispatch('joinGame', playerName);
    },

    joinGame: async ({ state, commit }, playerName: string) => {
      if (state.game) {
        await joinGame(state.game.id, playerName);
      }
    },
  },
};
