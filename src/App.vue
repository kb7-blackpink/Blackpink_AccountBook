<script setup>
import { RouterView } from 'vue-router';
import { useBudgetStore } from '@/stores/budget';
import { onMounted } from 'vue';

const budgetStore = useBudgetStore();

onMounted(() => {
  budgetStore.fetchAllData();
});
</script>

<template>
  <div
    class="w-full min-h-dvh"
    :class="[
      budgetStore.currentMode === 'lucky' ? 'bg-gray-50' : 'bg-neutral-500',
    ]"
  >
    <!-- <Header /> -->
    <div
      class="lg:w-5xl sm:w-lg mx-auto min-h-dvh p-5 lg:p-10"
      :class="[
        budgetStore.currentMode === 'lucky' ? 'bg-white' : 'bg-[#312E81]',
      ]"
    >
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
