import { InjectionKey } from 'vue';
import { createStore } from 'vuex';

import { game } from './game';

export const key: InjectionKey<typeof store> = Symbol();

export const store = createStore({
  modules: {
    game,
  },
});
