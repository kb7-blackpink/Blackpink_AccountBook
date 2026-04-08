import { createRouter, createWebHistory } from 'vue-router';
import SplashPage from '@/pages/SplashPage.vue';

// App 켜지자마자 SplashPage 보여줌
const routes = [
  {
    path: '/',
    name: 'splash',
    component: SplashPage,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/signup',
    component: () => import('@/pages/SignupPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
