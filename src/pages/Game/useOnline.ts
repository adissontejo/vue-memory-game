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

  const { player, playingNow, cards, selectedCards } = storeToRefs(store);

  const { nextRound } = store;

  watch(selectedCards, async () => {
    if (selectedCards.value.length !== 2) {
      return;
    }

    if (player.value.id !== playingNow.value?.id) {
      return;
    }

    await nextRound();
  });

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
      await store.selectCard(cardIndex);
    }
  };

  return {
    ...local,
    cards,
    selectedCards,
    playingNow,
    selectCard,
  };
};
