<script lang="ts">
import { defineComponent } from 'vue';

import image from '@/assets/question-mark.svg';

export default defineComponent({
  name: 'Card',

  props: {
    shown: Boolean,
    color: String,
  },

  data() {
    return {
      image,
    };
  },

  computed: {
    frontStyle() {
      return {
        backgroundColor: this.color,
      };
    },
  },
});
</script>

<template>
  <button class="card">
    <div class="front" :class="{ hidden: !shown }" :style="frontStyle"></div>
    <div class="back" :class="{ hidden: shown }">
      <div>
        <img :src="image" />
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.card {
  position: relative;

  width: 150px;
  height: 150px;
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
}

.back {
  padding: 15px;

  background: $primary-color;

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

.front,
.back {
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

  &.hidden {
    transform: rotateY(180deg);
  }
}

.back:not(.hidden) {
  transform: rotateY(360deg);
}
</style>
