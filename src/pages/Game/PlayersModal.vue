<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';

import startImg from '@/assets/start.svg';

import { NButton } from '@/components';
import { useGameStore } from '@/store';

export default defineComponent({
  name: 'PlayersModal',

  components: {
    NButton,
  },

  setup() {
    const store = useGameStore();

    const { player, players, state } = storeToRefs(store);

    const { startGame } = store;

    return {
      startImg,
      player,
      players,
      state,
      startGame,
    };
  },
});
</script>

<template>
  <div v-if="state === 'waiting'" class="players-modal">
    <div class="wrapper">
      <h2>Players</h2>
      <ul>
        <li v-for="item in players" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
      <NButton
        v-if="player.created && players.length > 1"
        svg
        class="button"
        :src="startImg"
        @click="startGame"
      >
        Start game
      </NButton>
      <p v-else-if="!player.created" class="wait">
        Wait for the host to start the game
      </p>
      <p v-else class="wait">Wait for more players to join</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.players-modal {
  position: fixed;
  top: 0;
  left: 0;

  padding: 20px;

  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);

  > .wrapper {
    margin: 0 auto;
    padding: 10px;

    width: 100%;
    max-width: 600px;
    height: 100%;
    border: 1px solid white;
    border-radius: 10px;
    background: $primary-color;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    > ul {
      width: calc(100% - 120px);
      max-width: 220px;
    }

    > .button {
      align-self: center;

      margin: auto 0 20px;

      width: calc(100% - 40px);
      max-width: 300px;
    }

    > .wait {
      margin: auto 0 20px;
    }
  }
}
</style>
