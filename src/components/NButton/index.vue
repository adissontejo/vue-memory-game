<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'NButton',

  props: {
    src: String,
    svg: Boolean,
    color: {
      type: String as PropType<'primary' | 'white'>,
      default: 'white',
    },
  },
});
</script>

<template>
  <button class="nbutton" :class="color">
    <img v-if="!svg" class="icon" :src="src" :class="{ hidden: !src }" />
    <inline-svg v-else class="icon" :src="src" :class="{ hidden: !src }" />
    <p class="label"><slot></slot></p>
  </button>
</template>

<style lang="scss" scoped>
.nbutton {
  padding: 5px;

  width: 100%;
  height: fit-content;
  border-radius: 5px;

  cursor: pointer;

  transition: all 0.3s;

  &:hover {
    filter: brightness(0.9);
  }

  display: flex;
  align-items: center;

  > .icon {
    width: 20px;
    height: 20px;

    &.hidden {
      visibility: hidden;
    }
  }

  > p {
    margin: 0 25px 0 0;

    flex: 1;

    font-size: 18px;
    text-align: center;
  }

  &.primary {
    background: $primary-color;

    > .icon {
      fill: white;
    }

    > p {
      color: white;
    }
  }

  &.white {
    background: white;

    > .icon {
      fill: $primary-color;
    }

    > p {
      color: $primary-color;
    }
  }
}
</style>
