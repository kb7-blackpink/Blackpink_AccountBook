import { createRouter, createWebHistory } from 'vue-router';
import SplashPage from '@/pages/SplashPage.vue';
import StatisticPage from '@/pages/StatisticPage.vue';

// App 켜지자마자 SplashPage 보여줌
const routes = [
  {
    path: '/',
    name: 'splash',
    component: SplashPage,
  },
  {
    path: '/statistic',
    name: statistic,
    component: StatisticPage,
  },
  {
    path: '/login',
    name: 'login',

    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/pages/SignupPage.vue'),
  },
  {
    path: '/settings',
    component: () => import('@/pages/SettingsPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
