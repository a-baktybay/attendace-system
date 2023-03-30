import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '../../pages/Main/index.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  }
];

const base = '/';

const router = createRouter({
  history: createWebHistory(base),
  routes
});

export { router };