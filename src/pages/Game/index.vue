<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';

import { NCard } from '@/components';
import { useGameStore } from '@/store';
import { getMemoryCardsList } from '@/utils';

import EnterName from '@/pages/EnterName/index.vue';

import PlayersModal from './PlayersModal.vue';

const memoryCards = getMemoryCardsList();

export default defineComponent({
  name: 'Game',

  components: {
    NCard,
    EnterName,
    PlayersModal,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useGameStore();

    const cards = ref(
      memoryCards.map(item => ({
        color: item,
        found: false,
      }))
    );
    const enterName = ref(!store.player.id && route.params.id);
    const selected = ref<number[]>([]);
    const attempts = ref(0);

    const cardShown = computed(() => {
      return cards.value.map((card, index) => {
        return selected.value.some(item => item === index) || card.found;
      });
    });

    const joinGame = async (name: string) => {
      const playerId = await store.joinGame(route.params.id as string, name);

      if (!playerId) {
        alert('Game not found.');
      }

      enterName.value = false;
    };

    const selectCard = (index: number) => {
      if (cardShown.value[index] || selected.value.length === 2) {
        return;
      }

      selected.value.push(index);

      if (selected.value.length === 2) {
        attempts.value++;

        const cardA = cards.value[selected.value[0]];
        const cardB = cards.value[selected.value[1]];

        if (cardA.color !== cardB.color) {
          setTimeout(() => {
            selected.value = [];
          }, 1000);
        } else {
          cardA.found = true;
          cardB.found = true;

          selected.value = [];
        }
      }
    };

    return {
      cards,
      enterName,
      selected,
      attempts,
      cardShown,
      online: !!route.params.id,
      joinGame,
      selectCard,
    };
  },
});
</script>

<template>
  <EnterName v-if="enterName" @submit="joinGame" />
  <div v-else class="home">
    <h1>Memory Game</h1>
    <h3>Attempts: {{ attempts }}</h3>
    <main>
      <NCard
        v-for="(card, index) in cards"
        :key="index"
        :color="card.color"
        :shown="cardShown[index]"
        @click="selectCard(index)"
      />
    </main>
    <PlayersModal v-if="online" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding: 30px 0 15px;

  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  > h1 {
    text-align: center;
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
