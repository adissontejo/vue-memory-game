<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  RendererElement,
} from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import Flip from 'gsap/Flip';

import { NCard } from '@/components';

import PlayersModal from './PlayersModal.vue';
import { useLocal } from './useLocal';
import { useOnline } from './useOnline';
import { Player } from '@/types';

gsap.registerPlugin(Flip);

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

    const test = ref(false);

    onMounted(() => {
      test.value = true;
    });

    const cardShown = computed(() => {
      return data.cards?.value.map((item, index) => {
        return data.selectedCards.value.includes(index) || item.found;
      });
    });

    const beforeEnter = (el: Element) => {
      gsap.set(el, {
        position: 'fixed',
        x: 0,
        y: 0,
      });
    };

    const enter = (el: RendererElement, done: () => void) => {
      const state = Flip.getState(el as Element);

      gsap.set(el, {
        position: 'static',
      });

      Flip.from(state, {
        delay: el.dataset.index * 0.05,
        duration: 0.3,
        onComplete: () => done(),
      });
    };

    return {
      playingNow: {} as Player,
      online,
      test,
      cardShown,
      beforeEnter,
      enter,
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
      <TransitionGroup name="card" @before-enter="beforeEnter" @enter="enter">
        <div
          v-for="(card, index) in cards"
          class="card"
          :key="index"
          :data-index="index"
        >
          <NCard
            :color="card.color"
            :shown="cardShown[index]"
            @click="selectCard(index)"
          />
        </div>
      </TransitionGroup>
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
    padding: 0 30px;

    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
    justify-content: space-evenly;
    grid-gap: 10px;
  }
}
</style>
