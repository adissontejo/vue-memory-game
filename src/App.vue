<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { io } from 'socket.io-client';

import { useSocket } from './store';

export default defineComponent({
  name: 'App',

  setup() {
    onBeforeMount(() => {
      const socket = useSocket();

      socket.connect();
    });
  },
});
</script>

<template>
  <router-view />
</template>

<style lang="scss" src="./styles/global.scss" />
