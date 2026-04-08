<template>
  <div class="w-250 mx-auto bg-white min-h-dvh">
    <div class="p-20 flex flex-col gap-10">
      <div class="flex justify-center gap-10">
        <div
          class="h-50 border rounded-3xl flex-1 px-7 py-5 flex flex-col justify-between gap-5"
        >
          <div class="pb-5 border-b">
            <p class="text-md text-neutral-500 pb-2">Total Balance</p>
            <p class="font-bold text-3xl text-green-500">
              {{ summary.totalBalance }}
            </p>
          </div>

          <div class="flex gap-10">
            <div>
              <p class="text-sm text-neutral-500 pb-1">Total Income</p>
              <p class="font-semibold text-xl text-blue-600">
                + {{ summary.totalIncome }}
              </p>
            </div>

            <div>
              <p class="text-sm text-neutral-500 pb-1">Total Expense</p>
              <p class="font-semibold text-xl text-red-500">
                - {{ summary.totalExpense }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="w-60 h-50 border rounded-3xl px-7 py-5 flex flex-col justify-between"
        >
          <div>
            <p class="font-bold text-2xl">
              지난 달 이 때보다 <br />
              <span class="text-green-500"
                >{{ summary.diff.toLocaleString() }}원</span
              >
              더 쓰는중
            </p>
          </div>
          <div>
            <p class="text-neutral-500 text-sm">지난 달 소비: 256,890원</p>
            <p class="text-neutral-500 text-sm">이번 달 소비: 267,890원</p>
          </div>
        </div>
      </div>
      <div
        class="h-15 border rounded-2xl px-5 py-5 flex items-center justify-between gap-3"
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

const summary = budgetStore.summary;
</script>

<style scoped></style>
