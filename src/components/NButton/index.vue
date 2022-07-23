<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NButton',

  props: {
    src: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <button class="nbutton">
    <img :src="src" />
    <p class="label"><slot></slot></p>
  </button>
</template>

<style lang="scss" scoped src="./styles.scss" />
