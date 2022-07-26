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
import { cards } from '@/data';

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

    const interaction = ref(false);

    const cardShown = computed(() => {
      return data.cards?.value.map((item, index) => {
        return data.selectedCards.value.includes(index) || item.found;
      });
    });

    const beforeEnter = (el: Element) => {
      gsap.set(el, {
        position: 'absolute',
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
        delay: 0.5 + el.dataset.index * 0.1,
        duration: 0.3,
        onComplete: () => done(),
      });
    };

    const afterEnter = (el: RendererElement) => {
      if (parseInt(el.dataset.index) === data.cards.value.length - 1) {
        interaction.value = true;
      }
    };

    return {
      playingNow: {} as Player,
      online,
      cardShown,
      interaction,
      beforeEnter,
      enter,
      afterEnter,
      ...data,
    };
  },
});
</script>

<template>
  <div class="game">
    <h1>Memory Game</h1>
    <h3 v-if="!online">Attempts: {{ attempts }}</h3>
    <h3 v-else-if="playingNow">
      Playing now: {{ playingNow.name }}<br />Score: {{ playingNow.score }}
    </h3>
    <main>
      <TransitionGroup
        name="card"
        :appear="true"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div
          v-for="(card, index) in cards"
          class="card"
          :key="index"
          :data-index="index"
          :style="{ zIndex: index === 0 ? 1 : 0 }"
        >
          <NCard
            :color="card.color"
            :shown="cardShown[index]"
            @click="interaction && selectCard(index)"
          />
        </div>
      </TransitionGroup>
    </main>
    <PlayersModal v-if="online" />
  </div>
</template>

<style lang="scss" scoped>
.game {
  padding: 30px 20px;

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
    position: relative;

    margin: 35px 0 0;

    min-width: fit-content;
    max-width: min(100%, 1140px);

    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
    justify-content: space-between;
    grid-gap: 20px;

    @media screen and (max-width: 600px) {
      grid-template-columns: repeat(auto-fill, 100px);
    }
  }

  .card {
    box-shadow: none;
  }
}
</style>
