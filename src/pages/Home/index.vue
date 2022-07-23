<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import startImg from '@/assets/start.svg';
import friendsImg from '@/assets/friends.svg';

import { NButton } from '@/components';
import { useStore } from '@/hooks';

export default defineComponent({
  name: 'Home',

  components: {
    NButton,
  },

  setup() {
    const router = useRouter();
    const { dispatch } = useStore();

    const startGame = () => {
      router.push({ name: 'game' });
    };

    const createGame = () => {
      dispatch('createGame', 'Adisson');
    };

    return { startImg, friendsImg, startGame, createGame };
  },
});
</script>

<template>
  <div class="home">
    <main>
      <div class="wrapper">
        <h1>Memory Game</h1>
        <NButton :src="startImg" @click="startGame">Start</NButton>
        <NButton :src="friendsImg" @click="createGame">
          Play with friends
        </NButton>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
