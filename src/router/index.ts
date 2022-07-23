import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { Game, Home } from '@/pages';

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
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
