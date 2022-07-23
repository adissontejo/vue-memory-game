<script lang="ts">
import { defineComponent } from 'vue';

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
    const { dispatch } = useStore();

    const createGame = () => {
      dispatch('createGame', 'Adisson');
    };

    return { startImg, friendsImg, createGame };
  },
});
</script>

<template>
  <div class="home">
    <main>
      <div class="wrapper">
        <h1>Memory Game</h1>
        <NButton :src="startImg">Start</NButton>
        <NButton :src="friendsImg" @click="createGame">
          Play with friends
        </NButton>
      </div>
    </main>
  </div>
</template>

<style lang="scss" src="@/styles/global.scss" />
<style lang="scss" scoped src="./styles.scss" />
