import { createRouter, createWebHistory } from 'vue-router';

import DashbordPage from '@/pages/Dashbord/index.vue';
import AttendancePage from '@/pages/Attendance/index.vue';
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
  }, 
  {
    path: '/card',
    name: 'AttendancePage',
    component: AttendancePage
  }
];

const base = '/';

const router = createRouter({
  history: createWebHistory(base),
  routes
});

router.beforeEach(async (to, _) => {
  if(!localStorage.getItem('user') && to.name !== 'MainPage' && to.name !== 'AttendancePage') {
    return { name: 'MainPage' };
  }

  if(localStorage.getItem('user') && to.name === 'MainPage') {
    return { name: 'DashbordPage' };
  }
})

export { router };