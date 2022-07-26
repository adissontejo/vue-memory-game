<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { NButton } from '@/components';
import { useGameStore } from '@/store';
import { Player } from '@/types';

export default defineComponent({
  name: 'PlayersModal',

  components: {
    NButton,
  },

  setup() {
    const store = useGameStore();

    const { gameState, cardsLefting } = storeToRefs(store);

    const players = ref<Player[]>([]);

    const best = computed(() => players.value[0]);

    const draw = computed(() => {
      return players.value[1]?.score === best.value?.score;
    });

    watch(cardsLefting, () => {
      if (cardsLefting.value !== 0) {
        return;
      }

      players.value = store.players.sort((a, b) => b.score - a.score);
    });

    return {
      gameState,
      players,
      best,
      draw,
    };
  },
});
</script>

<template>
  <div v-if="gameState === 'finished'" class="final-score">
    <div class="wrapper">
      <h3>Game Over</h3>
      <h3 v-if="!draw">{{ best.name }} won!</h3>
      <h3 v-else>Draw!</h3>
      <div class="head">
        <span class="player">Player</span>
        <span class="score">Score</span>
      </div>
      <ol>
        <li v-for="item in players">
          <div class="line">
            <span class="player">{{ item.name }}</span>
            <span class="score">{{ item.score }}</span>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.final-score {
  position: fixed;
  top: 0;
  left: 0;

  padding: 20px;

  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;

  > .wrapper {
    padding: 10px;

    width: 100%;
    max-width: 600px;
    border: 1px solid white;
    border-radius: 10px;
    background: $primary-color;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    > .head {
      margin: 10px 0;
      padding: 0 20px;

      width: calc(100% - 80px);

      font-weight: 600;

      display: flex;

      > .player {
        padding: 0 0 0 5px;

        flex: 1;
      }

      > .score {
        width: 40px;
      }
    }

    > ol {
      padding: 0 20px;

      width: calc(100% - 80px);
      height: 250px;

      > li {
        width: 100%;

        > .line {
          width: 100%;

          display: flex;

          > .player {
            flex: 1;

            padding: 0 0 0 5px;

            white-space: pre;
            text-overflow: ellipsis;
          }

          > .score {
            width: 40px;

            text-align: center;
          }
        }
      }
    }
  }
}
</style>
