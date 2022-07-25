<script lang="ts">
import { defineComponent } from 'vue';

import image from '@/assets/question-mark.svg';

export default defineComponent({
  name: 'NCard',

  props: {
    shown: Boolean,
    color: String,
  },

  setup() {
    return {
      image,
    };
  },
});
</script>

<template>
  <button class="container">
    <Transition name="flip">
      <div v-if="shown" class="front flip"></div>
      <div v-else class="back flip">
        <div>
          <img :src="image" />
        </div>
      </div>
    </Transition>
  </button>
</template>

<style lang="scss" scoped>
.container {
  position: relative;

  width: 130px;
  height: 130px;
  perspective: 1000px;

  cursor: pointer;

  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);

    .front,
    .back {
      box-shadow: 10px 10px 8px 0 rgba(0, 0, 0, 0.4);
    }
  }

  > .front,
  > .back {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    border-radius: 10px;
    backface-visibility: hidden;
    box-shadow: 5px 5px 4px 0px rgba(0, 0, 0, 0.25);

    transform-style: preserve-3d;
    transition: box-shadow 0.3s, transform 0.7s;
  }

  > .front {
    background: v-bind(color);

    &.flip-enter-from,
    &.flip-leave-to {
      transform: rotateY(-180deg);
    }
  }

  > .back {
    padding: 15px;

    background: $primary-color;

    &.flip-enter-from,
    &.flip-leave-to {
      transform: rotateY(180deg);
    }

    > div {
      width: 100%;
      height: 100%;
      border: 1px solid $accent-color;
      border-radius: 10px;

      display: flex;
      align-items: center;
      justify-content: center;

      > img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
