<script setup>
import { RouterView, useRoute } from 'vue-router';
import { useBudgetStore } from '@/stores/budget';
import { onMounted, computed } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import { useUserStore } from '@/stores/user';
import FloatingButtons from './components/layout/FloatingButtons.vue';
import AddTransactionModal from './components/common/AddTransactionModal.vue';
import { useModalStore } from '@/stores/modal';

const budgetStore = useBudgetStore();
const userStore = useUserStore();
const route = useRoute();
const modalStore = useModalStore();

onMounted(async () => {
  budgetStore.fetchAllData();
  userStore.loadUserFromStorage();
});

const isAuthPage = computed(() => {
  return ['login', 'signup', 'splash'].includes(route.name);
});

const themeClass = computed(() =>
  userStore.mode === 'lucky' ? 'theme-lucky' : 'theme-unlucky',
);
</script>

<template>
  <div
    class="bg-app text-app w-full transition-colors duration-500"
    :class="[themeClass, !isAuthPage && 'min-h-dvh']"
  >
    <AppHeader class="sticky top-0 z-[1000]" />

    <div
      class="bg-app text-app mx-auto py-3 transition-colors duration-500 sm:w-lg lg:w-5xl"
      :class="[!isAuthPage && 'min-h-dvh']"
    >
      <RouterView />
    </div>
    <AddTransactionModal v-if="modalStore.isAddModalOpen" />
  </div>

  <FloatingButtons v-if="!isAuthPage" />
</template>

<style scoped></style>
