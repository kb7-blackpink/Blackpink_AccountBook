<script setup>
import { RouterView, useRoute } from 'vue-router';
import { useBudgetStore } from '@/stores/budget';
import { onMounted, computed } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import { useUserStore } from '@/stores/user';

const budgetStore = useBudgetStore();
const userStore = useUserStore();
const route = useRoute();

onMounted(async () => {
  budgetStore.fetchAllData();
  userStore.fetchUserMode();
});

const isAuthPage = computed(() => {
  return ['login', 'signup'].includes(route.name);
});

const themeClass = computed(() =>
  userStore.mode === 'lucky' ? 'theme-lucky' : 'theme-unlucky',
);
</script>

<template>
  <div
<<<<<<< HEAD
    class="bg-app text-app w-full transition-colors duration-500"
    :class="[themeClass, !isAuthPage && 'min-h-dvh']"
  >
    <AppHeader />

    <div
      class="bg-app text-app mx-auto py-3 transition-colors duration-500 sm:w-lg lg:w-5xl"
      :class="[!isAuthPage && 'min-h-dvh']"
=======
    class="w-full transition-colors duration-500"
    :class="[
      !isAuthPage && 'min-h-dvh',
      userStore.mode === 'lucky' ? 'bg-gray-50' : 'bg-[#312E81]',
    ]"
  >
    <AppHeader />
    <div
      class="lg:w-5xl sm:w-lg mx-auto py-3 lg:py-3 transition-colors duration-500"
      :class="[
        !isAuthPage && 'min-h-dvh',
        userStore.mode === 'lucky' ? 'bg-white' : 'bg-[#312E81] text-white',
      ]"
>>>>>>> 4aed137 (test: 중간저장)
    >
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>