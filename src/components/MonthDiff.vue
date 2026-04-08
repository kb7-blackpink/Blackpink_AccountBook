<template>
  <div
    class="w-40 h-30 lg:w-60 lg:h-50 border border-neutral-700 rounded-3xl px-4 py-3 lg:px-7 lg:py-5 flex flex-col justify-between"
  >
    <div>
      <p class="font-bold lg:text-2xl text-sm">
        지난 달 이 때보다 <br />
        <span
          :class="
            budgetStore.summary.diff >= 0 ? 'text-red-500' : 'text-green-500'
          "
        >
          {{ Math.abs(budgetStore.summary.diff).toLocaleString() }}원
        </span>

        {{ budgetStore.summary.diff >= 0 ? '더 쓰는 중' : '덜 쓰는 중' }}!
      </p>
    </div>
    <div>
      <p class="text-neutral-500 text-xs lg:text-sm">
        지난 달 소비:
        {{ budgetStore.summary.lastMonthExpense.toLocaleString() }}원
      </p>
      <p class="text-neutral-500 text-xs lg:text-sm">
        이번 달 소비:
        {{ budgetStore.summary.thisMonthExpense.toLocaleString() }}원
      </p>
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
