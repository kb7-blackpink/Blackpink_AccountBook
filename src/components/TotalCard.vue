<template>
  <div
    class="h-30 lg:h-50 border border-neutral-700 rounded-3xl flex-1 px-4 py-3 lg:px-7 lg:py-5 flex flex-col justify-between gap-2.5 lg:gap-5"
  >
    <div class="pb-1 lg:pb-5 border-b border-neutral-700">
      <p class="text-xs lg:text-md text-neutral-500 lg:pb-2">Total Balance</p>
      <p class="text-lg font-bold lg:text-3xl text-green-500">
        {{ budgetStore.summary.totalBalance }}
      </p>
    </div>

    <div class="flex gap-10">
      <div>
        <p class="text-xs lg:text-sm text-neutral-500 pb-1">Total Income</p>
        <p class="font-semibold text-sm lg:text-xl text-blue-600">
          + {{ budgetStore.summary.totalIncome }}
        </p>
      </div>

      <div>
        <p class="text-xs lg:text-sm text-neutral-500 pb-1">Total Expense</p>
        <p class="font-semibold text-sm lg:text-xl text-red-500">
          - {{ budgetStore.summary.totalExpense }}
        </p>
      </div>
    </div>
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
