<script lang="ts">
import { defineComponent, onUnmounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'NModal',

  props: {
    visible: Boolean,
  },

  emits: {
    close: () => {},
  },

  setup(props) {
    watch(
      () => props.visible,
      () => {
        if (props.visible) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      }
    );

    onUnmounted(() => {
      document.body.style.overflow = 'auto';
    });
  },
});
</script>

<template>
  <div class="nmodal" :class="{ visible }" @click="$emit('close')">
    <div class="body" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nmodal {
  position: fixed;

  width: 100vw;
  height: 100vh;
  background: rgba(1, 1, 1, 0.4);
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  .body {
    padding: 50px 10px;

    width: calc(100% - 40px);
    max-width: 400px;
    background: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    transition: all 0.3s;
  }

  &:not(.visible) {
    visibility: hidden;

    .body {
      opacity: 0;
      transform: translateY(50%);
    }
  }
}
</style>
