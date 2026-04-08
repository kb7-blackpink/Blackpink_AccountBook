<template>
  <div
    class="h-50 border border-neutral-700 rounded-3xl flex-1 px-7 py-5 flex flex-col justify-between gap-5"
  >
    <div class="pb-5 border-b border-neutral-700">
      <p class="text-md text-neutral-500 pb-2">Total Balance</p>
      <p class="font-bold text-3xl text-green-500">
        {{ budgetStore.summary.totalBalance }}
      </p>
    </div>

    <div class="flex gap-10">
      <div>
        <p class="text-sm text-neutral-500 pb-1">Total Income</p>
        <p class="font-semibold text-xl text-blue-600">
          + {{ budgetStore.summary.totalIncome }}
        </p>
      </div>

      <div>
        <p class="text-sm text-neutral-500 pb-1">Total Expense</p>
        <p class="font-semibold text-xl text-red-500">
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
