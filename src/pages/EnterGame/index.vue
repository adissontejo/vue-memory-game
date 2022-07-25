<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { NButton, NMain } from '@/components';
import { useGameStore } from '@/store';

export default defineComponent({
  name: 'EnterGame',

  components: {
    NButton,
    NMain,
  },

  props: {
    action: {
      type: String as PropType<'create' | 'join'>,
      default: 'join',
    },
  },

  setup(props) {
    const store = useGameStore();
    const router = useRouter();
    const route = useRoute();

    const name = ref('');
    const input = ref<HTMLInputElement>();

    onMounted(() => {
      input.value?.focus();
    });

    const enterGame = async () => {
      if (props.action === 'create') {
        const gameId = await store.createGame(name.value);

        router.push(`/game/${gameId}`);
      } else {
        await store.joinGame(route.params.id as string, name.value);

        router.push(`/game/${route.params.id}`);
      }
    };

    return { name, input, enterGame };
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
        @keydown.enter="enterGame"
      />
      <NButton @click.once="enterGame">Go!</NButton>
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
