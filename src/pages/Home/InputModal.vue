<script lang="ts">
import { defineComponent, ref } from 'vue';

import { NButton, NModal } from '@/components';

export default defineComponent({
  name: 'InputModal',

  components: {
    NButton,
    NModal,
  },

  props: {
    visible: Boolean,
  },

  emits: {
    close: () => {},
    submit: (value: string) => {},
  },

  setup() {
    const playerName = ref('');

    return { playerName };
  },
});
</script>

<template>
  <NModal class="input-modal" :visible="visible" @close="$emit('close')">
    <p>Type your name:</p>
    <input
      type="text"
      ref="inputRef"
      maxlength="25"
      required
      @keydown.enter="$emit('submit', playerName)"
      v-model.lazy.trim="playerName"
    />
    <NButton
      class="button"
      color="primary"
      @click="$emit('submit', playerName)"
    >
      Create game
    </NButton>
  </NModal>
</template>

<style lang="scss" scoped>
.input-modal::v-deep > .body {
  justify-content: center;
  gap: 10px;

  > p {
    color: black;
  }

  > input {
    padding: 2px;

    width: calc(100% - 20px);
    max-width: 200px;
    border-style: none none solid none;

    color: black;
    font-size: 18px;

    &:focus {
      outline: none;
    }
  }

  > .button {
    margin: 10px 0 0;

    width: calc(100% - 10px);
    max-width: 210px;
  }
}
</style>
