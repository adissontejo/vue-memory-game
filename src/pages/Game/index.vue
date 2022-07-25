<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import { NCard } from '@/components';

import PlayersModal from './PlayersModal.vue';
import { useLocal } from './useLocal';
import { useOnline } from './useOnline';
import { Player } from '@/types';

export default defineComponent({
  name: 'Game',

  components: {
    NCard,
    PlayersModal,
  },

  setup() {
    const route = useRoute();

    const online = !!route.params.id;

    const data = online ? useOnline() : useLocal();

    const cardShown = computed(() => {
      return data.cards?.value.map((item, index) => {
        return data.selectedCards.value.includes(index) || item.found;
      });
    });

    return {
      playingNow: {} as Player,
      online,
      cardShown,
      ...data,
    };
  },
});
</script>

<template>
  <div class="home">
    <h1>Memory Game</h1>
    <h3 v-if="!online">Attempts: {{ attempts }}</h3>
    <h3 v-else-if="playingNow">
      Playing now: {{ playingNow.name }}<br />Score: {{ playingNow.score }}
    </h3>
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

  > h1,
  > h3 {
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
