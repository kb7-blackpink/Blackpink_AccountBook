<template>
  <div
    class="h-15 border rounded-2xl border-neutral-700 px-5 py-5 flex items-center justify-between gap-3"
  >
    <div class="flex items-center gap-3">
      <p>📢</p>
      <p>품위 유지를 하려고 했구나!!! 너무 멋져!!! 완전 멋쟁이!!! 😎🍀</p>
    </div>
    <button
      class="bg-green-200/80 border border-green-600 text-green-800 px-5 py-2 rounded-lg text-sm cursor-pointer"
    >
      분석
    </button>
  </div>
</template>

<script setup>
import { useBudgetStore } from '@/stores/budget';
import { onMounted } from 'vue';

const budgetStore = useBudgetStore();

onMounted(() => {
  budgetStore.fetchTransaction();
});
</script>

<style scoped></style>
