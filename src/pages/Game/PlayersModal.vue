<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';

import { useGameStore } from '@/store';

export default defineComponent({
  name: 'PlayersModal',

  setup() {
    const store = useGameStore();

    const { players } = storeToRefs(store);

    return {
      players,
    };
  },
});
</script>

<template>
  <div class="players-modal">
    <div class="wrapper">
      <h2>Players</h2>
      <ul>
        <li v-for="player in players" :key="player.id">
          {{ player.name }}
        </li>
      </ul>
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
  background: rgba(1, 1, 1, 0.8);

  > .wrapper {
    padding: 10px;

    width: 100%;
    height: 100%;
    border: 1px solid white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    > h2 {
      align-self: center;
    }

    > ul {
      > li {
        list-style-type: none;
      }
    }
  }
}
</style>
