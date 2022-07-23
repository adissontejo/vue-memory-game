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
        found: false,
      })),
      selected: [] as number[],
    };
  },

  computed: {
    cardShown(): boolean[] {
      return this.cards.map((card, index) => {
        return this.selected.some(item => item === index) || card.found;
      });
    },
  },

  methods: {
    selectCard(index: number) {
      if (this.cardShown[index] || this.selected.length === 2) {
        return;
      }

      this.selected.push(index);

      if (this.selected.length === 2) {
        const cardA = this.cards[this.selected[0]];
        const cardB = this.cards[this.selected[1]];

        if (cardA.color !== cardB.color) {
          setTimeout(() => {
            this.selected = [];
          }, 1000);
        } else {
          cardA.found = true;
          cardB.found = true;

          this.selected = [];
        }
      }
    },
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
        :shown="cardShown[index]"
        @click="selectCard(index)"
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
