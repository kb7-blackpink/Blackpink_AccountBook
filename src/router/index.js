import { createRouter, createWebHistory } from 'vue-router';

// App 켜지자마자 SplashPage 보여줌
const routes = [
  {
    path: '/',
    name: 'splash',
    component: () => import('@/pages/SplashPage.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
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
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('@/pages/StatisticsPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from) => {
  const publicPages = ['splash', 'login', 'signup'];
  const isPublicPage = publicPages.includes(to.name);
  const savedUser = localStorage.getItem('loginUser');
  const isLoggedIn = !!savedUser;
  if (!isPublicPage && !isLoggedIn) {
    return { name: 'login' };
  }
  if (isLoggedIn && ['login', 'signup'].includes(to.name)) {
    return { name: 'home' };
  }
  return true;
});

export default router;
