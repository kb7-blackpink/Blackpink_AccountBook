<script setup>
import { RouterView, useRoute } from 'vue-router';
import { useBudgetStore } from '@/stores/budget';
import { onMounted, computed } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';

const budgetStore = useBudgetStore();

const route = useRoute();

onMounted(() => {
  budgetStore.fetchAllData();
});

// 로그인/회원가입 페이지 여부
const isAuthPage = computed(() => {
  return ['login', 'signup'].includes(route.name);
});
</script>

<template>
  <div
    class="w-full"
    :class="[
      !isAuthPage && 'min-h-dvh',
      budgetStore.currentMode === 'lucky' ? 'bg-gray-50' : 'bg-neutral-500',
    ]"
  >
    <AppHeader></AppHeader>
    <div
      class="lg:w-5xl sm:w-lg mx-auto p-5 lg:p-10"
      :class="[
        !isAuthPage && 'min-h-dvh',
        budgetStore.currentMode === 'lucky' ? 'bg-white' : 'bg-[#312E81]',
      ]"
    >
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
