<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { computed, toRefs } from '@vue/reactivity';

import { NCard } from '@/components';
import { getMemoryCardsList } from '@/utils';

const cards = getMemoryCardsList();

export default defineComponent({
  name: 'Home',

  components: {
    NCard,
  },

  setup() {
    const state = reactive({
      cards: cards.map(item => ({
        color: item,
        found: false,
      })),
      selected: [] as number[],
    });

    const cardShown = computed(() => {
      return state.cards.map((card, index) => {
        return state.selected.some(item => item === index) || card.found;
      });
    });

    const selectCard = (index: number) => {
      if (cardShown.value[index] || state.selected.length === 2) {
        return;
      }

      state.selected.push(index);

      if (state.selected.length === 2) {
        const cardA = state.cards[state.selected[0]];
        const cardB = state.cards[state.selected[1]];

        if (cardA.color !== cardB.color) {
          setTimeout(() => {
            state.selected = [];
          }, 1000);
        } else {
          cardA.found = true;
          cardB.found = true;

          state.selected = [];
        }
      }
    };

    return {
      ...state,
      cardShown,
      selectCard,
    };
  },
});
</script>

<template>
  <div class="home">
    <h1>Memory Game</h1>
    <main>
      <NCard
        v-for="(card, index) in cards"
        :key="index"
        :color="card.color"
        :shown="cardShown[index]"
        @click="selectCard(index)"
      />
    </main>
    <aside>
      <table>
        <tr>
          <th>Players</th>
          <th>Score</th>
        </tr>
        <tr>
          <td>Adisson</td>
          <td>3</td>
        </tr>
      </table>
    </aside>
  </div>
</template>

<style lang="scss" src="@/styles/global.scss" />
<style lang="scss" scoped src="./styles.scss" />
