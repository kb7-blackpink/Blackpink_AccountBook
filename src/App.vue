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

// 로그인/회원가입 페이지 여부
const isAuthPage = computed(() => {
  return ['login', 'signup'].includes(route.name);
});
</script>

<template>
  <div
    class="w-full transition-colors duration-500"
    :class="[
      !isAuthPage && 'min-h-dvh',
      userStore.mode === 'lucky' ? 'bg-gray-50' : 'bg-neutral-300',
    ]"
  >
    <AppHeader />
    <div
      class="lg:w-5xl sm:w-lg mx-auto p-5 lg:p-10 transition-colors duration-500"
      :class="[
        !isAuthPage && 'min-h-dvh',
        userStore.mode === 'lucky' ? 'bg-white' : 'bg-[#312E81] text-white',
      ]"
    >
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
