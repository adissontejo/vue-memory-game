<script lang="ts">
import { defineComponent } from 'vue';

import { Card } from '~/components';

export default defineComponent({
  name: 'App',
  components: {
    Card,
  },

  data() {
    return {
      cards: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    };
  },
});
</script>

<template>
  <div class="home">
    <h1>Memory Game</h1>
    <main>
      <Card v-for="card in cards" />
    </main>
  </div>
</template>

<style lang="scss" src="~/styles/global.scss" />
<style scoped lang="scss" src="./styles.scss" />
