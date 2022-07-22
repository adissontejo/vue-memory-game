<script lang="ts">
import { defineComponent } from 'vue';

import image from '~/assets/question-mark.svg';

import { getRandomColor } from '~/utils';

export default defineComponent({
  name: 'Card',

  data() {
    return {
      image,
      front: false,
      frontStyle: {
        backgroundColor: getRandomColor(),
      },
    };
  },
});
</script>

<template>
  <div class="card" @click="front = !front">
    <div class="front" :class="{ hidden: !front }" :style="frontStyle"></div>
    <div class="back" :class="{ hidden: front }">
      <div>
        <img :src="image" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss" />
