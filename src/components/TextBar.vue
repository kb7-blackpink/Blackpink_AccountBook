<template>
  <div
    class="h-13 lg:h-15 border rounded-2xl px-4 py-3 lg:px-4 lg:py-5 flex items-center justify-between gap-3"
    :class="[
      budgetStore.currentMode === 'lucky'
        ? 'border-neutral-400'
        : 'border-white',
    ]"
  >
    <div class="flex items-center gap-3">
      <p class="text-xs lg:text-md">📢</p>
      <p
        class="text-xs lg:text-lg"
        :class="[
          budgetStore.currentMode === 'lucky'
            ? 'text-neutral-800'
            : 'text-white',
        ]"
      >
        {{ budgetStore.dynamicMessage }}
      </p>
    </div>
    <RouterLink to="/analysis">
      <button
        class="border transition px-3 py-1.5 lg:px-5 lg:py-2 rounded-lg text-xs lg:text-sm cursor-pointer"
        :class="[
          budgetStore.currentMode === 'lucky'
            ? 'bg-green-200/80 border-green-600 text-green-800 hover:bg-green-300/80'
            : 'bg-indigo-600 border-indigo-400 text-indigo-200 hover:bg-indigo-700',
        ]"
      >
        분석
      </button>
    </RouterLink>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useBudgetStore } from '@/stores/budget';

const budgetStore = useBudgetStore();

onMounted(() => {
  budgetStore.fetchAllData();
});
</script>

<style scoped></style>
