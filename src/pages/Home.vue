<script lang="ts">
import { defineComponent } from 'vue';

import { Card } from '@/components';
import { getMemoryCardsList } from '@/utils';

const cards = getMemoryCardsList();

export default defineComponent({
  name: 'Home',
  components: {
    Card,
  },

  data() {
    return {
      cards: cards.map(item => ({
        color: item,
        shown: false,
      })),
    };
  },
});
</script>

<template>
  <div class="home">
    <h1>Memory Game</h1>
    <main>
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :color="card.color"
        :shown="card.shown"
        @click="card.shown = !card.shown"
      />
    </main>
  </div>
</template>

<style lang="scss" src="@/styles/global.scss" />
<style lang="scss" scoped>
.home {
  padding: 30px 0 15px;

  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  > h1 {
    color: white;
  }

  > main {
    padding: 0 10px;

    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    justify-content: space-evenly;
    grid-gap: 20px;

    &::after {
      content: '';
      flex: 1;
    }
  }
}
</style>
