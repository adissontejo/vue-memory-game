<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

import image from '@/assets/question-mark.svg';

import { key } from '@/store';

export default defineComponent({
  name: 'NCard',

  props: {
    shown: Boolean,
    color: String,
  },

  setup() {
    const { state } = useStore(key);

    return {
      image,
    };
  },
});
</script>

<template>
  <button class="ncard">
    <div class="front" :class="{ hidden: !shown }"></div>
    <div class="back" :class="{ hidden: shown }">
      <div>
        <img :src="image" />
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped src="./styles.scss" />
<style lang="scss" scoped>
.ncard > .front {
  background: v-bind(color);
}
</style>
