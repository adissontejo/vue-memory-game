import { onBeforeMount, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useGameStore } from '@/store';

import { useLocal } from './useLocal';

export const useOnline = () => {
  const store = useGameStore();
  const router = useRouter();
  const route = useRoute();

  const local = useLocal();

  const { gameState, player, playingNow, cards, selectedCards } =
    storeToRefs(store);

  onBeforeMount(() => {
    if (!store.player.id) {
      router.push(`/game/${route.params.id}/join`);

      return;
    }
  });

  onBeforeRouteLeave(async () => {
    await store.leaveGame();
  });

  const selectCard = async (cardIndex: number) => {
    if (player.value.id === playingNow.value?.id) {
      store.selectCard(cardIndex);
    }
  };

  return {
    ...local,
    gameState,
    cards,
    selectedCards,
    playingNow,
    selectCard,
  };
};
