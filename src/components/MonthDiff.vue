<template>
  <div
    class="w-40 h-30 lg:w-60 lg:h-50 border rounded-3xl px-4 py-3 lg:px-7 lg:py-5 flex flex-col justify-between"
    :class="[
      budgetStore.currentMode === 'lucky'
        ? 'border-neutral-400'
        : 'border-white',
    ]"
  >
    <div
      :class="[
        budgetStore.currentMode === 'lucky' ? 'text-neutral-800' : 'text-white',
      ]"
    >
      <p class="font-bold lg:text-2xl text-sm">
        지난 달 이 때보다 <br />
        <span
          :class="[
            // 1. 플러스이면서 럭키모드일 때, 2. 마이너스이면서 언럭키모드일 때
            budgetStore.currentMode === 'lucky'
              ? budgetStore.summary.diff >= 0
                ? 'text-red-500/80'
                : 'text-sky-500/80'
              : budgetStore.summary.diff >= 0
                ? 'text-orange-400'
                : 'text-purple-400',
          ]"
        >
          {{ Math.abs(budgetStore.summary.diff).toLocaleString() }}원
        </span>

        {{ budgetStore.summary.diff >= 0 ? '더 쓰는 중' : '덜 쓰는 중' }}!
      </p>
    </div>
    <div>
      <p
        class="text-xs lg:text-sm"
        :class="[
          budgetStore.currentMode === 'lucky'
            ? 'text-neutral-500'
            : 'text-neutral-100',
        ]"
      >
        지난 달 소비:
        {{ budgetStore.summary.lastMonthExpense.toLocaleString() }}원
      </p>
      <p
        class="text-xs lg:text-sm"
        :class="[
          budgetStore.currentMode === 'lucky'
            ? 'text-neutral-500'
            : 'text-neutral-100',
        ]"
      >
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
  budgetStore.fetchAllData();
});
</script>

<style scoped></style>
