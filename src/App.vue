<script setup>
import { RouterView } from 'vue-router';
import { useBudgetStore } from '@/stores/budget';
import { onMounted } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import { useUserStore } from '@/stores/user';

const budgetStore = useBudgetStore();
const userStore = useUserStore();

onMounted(async () => {
  budgetStore.fetchAllData();
  userStore.fetchUserData();
});
</script>

<template>
  <div
    class="w-full min-h-dvh transition-colors duration-500"
    :class="userStore.mode === 'lucky' ? 'bg-gray-50' : 'bg-neutral-300'"
  >
    <AppHeader />
    <div
      class="lg:w-5xl sm:w-lg mx-auto min-h-dvh p-5 lg:p-10 transition-colors duration-500"
      :class="
        userStore.mode === 'lucky' ? 'bg-white' : 'bg-[#312E81] text-white'
      "
    >
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
