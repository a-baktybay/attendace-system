import { createRouter, createWebHistory } from 'vue-router';

import DashbordPage from '@/pages/Dashbord/index.vue';
import MainPage from '../../pages/Main/index.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    props: true
  },
  {
    path: '/dashbord',
    name: 'DashbordPage',
    component: DashbordPage,
    props: true
  }
];

const base = '/';

const router = createRouter({
  history: createWebHistory(base),
  routes
});

router.beforeEach(async (to, _) => {
  if(!localStorage.getItem('user') && to.name !== 'MainPage') {
    return { name: 'MainPage' };
  }

  if(localStorage.getItem('user') && to.name === 'MainPage') {
    return { name: 'DashbordPage' };
  }
})

export { router };