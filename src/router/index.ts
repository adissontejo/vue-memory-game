import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { EnterGame, Game, Home } from '@/pages';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/game',
    name: 'game',
    component: Game,
  },
  {
    path: '/game/new',
    name: 'create-game',
    component: EnterGame,
    props: { action: 'create' },
  },
  {
    path: '/game/:id',
    name: 'online-game',
    component: Game,
  },
  {
    path: '/game/:id/join',
    name: 'join-game',
    component: EnterGame,
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
