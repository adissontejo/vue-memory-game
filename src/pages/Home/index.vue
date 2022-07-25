<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import startImg from '@/assets/start.svg';
import friendsImg from '@/assets/friends.svg';

import { NButton, NMain } from '@/components';

export default defineComponent({
  name: 'Home',

  components: {
    NButton,
    NMain,
  },

  setup() {
    const router = useRouter();

    const startGame = () => {
      router.push('/game');
    };

    const playOnline = () => {
      router.push('/game/new');
    };

    return {
      startImg,
      friendsImg,
      startGame,
      playOnline,
    };
  },
});
</script>

<template>
  <div class="home">
    <NMain class="main">
      <h1 class="home-title">Memory Game</h1>
      <NButton svg :src="startImg" @click="startGame">Start</NButton>
      <NButton svg :src="friendsImg" @click="playOnline">
        Play with friends
      </NButton>
    </NMain>
  </div>
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
