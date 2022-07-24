<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NMain',
});
</script>

<template>
  <main class="nmain">
    <div class="wrapper">
      <slot></slot>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.nmain {
  padding: 50px 10px;

  background: $primary-color;
  border: 1px solid white;
  border-radius: 10px;
  width: calc(100% - 40px);
  max-width: 400px;

  > .wrapper {
    margin: 0 auto;

    width: fit-content;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
}
</style>
