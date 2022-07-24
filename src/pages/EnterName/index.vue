<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { NButton, NMain } from '@/components';

export default defineComponent({
  name: 'EnterName',

  components: {
    NButton,
    NMain,
  },

  emits: {
    submit: (name: string) => {},
  },

  setup() {
    const name = ref('');
    const input = ref<HTMLInputElement>();

    onMounted(() => {
      input.value?.focus();
    });

    return { name, input };
  },
});
</script>

<template>
  <div class="enter-name">
    <NMain>
      <h2>Type a username:</h2>
      <input
        ref="input"
        class="enter-name-input"
        maxlength="25"
        required
        v-model.trim="name"
        @blur="input?.focus()"
        @keydown.enter="$emit('submit', name)"
      />
      <NButton @click.once="$emit('submit', name)">Go!</NButton>
    </NMain>
  </div>
</template>

<style lang="scss" scoped>
.enter-name {
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

.enter-name-input {
  margin: 15px 0;
  padding: 2px;

  width: calc(100vw - 60px);
  max-width: 250px;
  background: transparent;
  border-style: none;
  border-bottom: 1px solid white;

  font-size: 20px;

  &:focus {
    outline: none;
  }
}
</style>
