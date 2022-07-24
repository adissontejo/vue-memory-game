<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import startImg from '@/assets/start.svg';
import friendsImg from '@/assets/friends.svg';

import { NButton, NMain } from '@/components';
import { useGameStore } from '@/store';

import EnterName from '@/pages/EnterName/index.vue';

export default defineComponent({
  name: 'Home',

  components: {
    NButton,
    NMain,
    EnterName,
  },

  setup() {
    const router = useRouter();
    const store = useGameStore();

    const enterName = ref(false);

    const startGame = () => {
      router.push('/game');
    };

    const createGame = async (creatorName: string) => {
      const gameId = await store.createGame(creatorName);

      router.push(`/game/${gameId}`);
    };

    return {
      enterName,
      startImg,
      friendsImg,
      startGame,
      createGame,
    };
  },
});
</script>

<template>
  <div v-if="!enterName" class="home">
    <NMain class="main">
      <h1 class="home-title">Memory Game</h1>
      <NButton :src="startImg" @click="startGame">Start</NButton>
      <NButton color="white" :src="friendsImg" @click="enterName = true">
        Play with friends
      </NButton>
    </NMain>
  </div>
  <EnterName v-else @submit="createGame" />
</template>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

.home-title {
  margin: 0 0 40px;
}
</style>
