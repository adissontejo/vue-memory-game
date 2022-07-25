import { onBeforeMount, onMounted } from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useGameStore } from '@/store';

import { useLocal } from './useLocal';

export const useOnline = () => {
  const store = useGameStore();
  const router = useRouter();
  const route = useRoute();

  const local = useLocal();

  const { cards, selected } = storeToRefs(store);

  const { selectCard } = store;

  onBeforeMount(() => {
    if (!store.player.id) {
      router.push(`/game/${route.params.id}/join`);

      return;
    }
  });

  onMounted(() => {
    window.addEventListener('beforeunload', () => {
      store.leaveGame();
    });
  });

  onBeforeRouteLeave(() => {
    store.leaveGame();
  });

  return {
    ...local,
    cards,
    selected,
    selectCard,
  };
};
