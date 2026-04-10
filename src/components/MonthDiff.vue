<template>
  <div
    class="h-20 lg:w-60 lg:h-50 border rounded-3xl px-4 py-3 lg:px-7 lg:py-5 flex flex-col justify-between"
    :class="[
      userStore.mode === 'lucky'
        ? 'border-app bg-app'
        : 'border-white/30  bg-white/10',
    ]"
  >
    <div
      :class="[
        userStore.mode === 'lucky' ? 'text-neutral-700' : 'text-white', // ✅ 수정
      ]"
    >
      <p class="font-bold lg:text-2xl text-sm">
        지난 달 이 때보다 <br class="hidden lg:block" />
        <span
          :class="[
            userStore.mode === 'lucky'
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
        class="text-[10px] lg:text-sm"
        :class="[
          userStore.mode === 'lucky' ? 'text-neutral-500' : 'text-neutral-200',
        ]"
      >
        지난 달 소비:
        {{ budgetStore.summary.lastMonthExpense.toLocaleString() }}원
      </p>
      <p
        class="text-[10px] lg:text-sm"
        :class="[
          userStore.mode === 'lucky' ? 'text-neutral-500' : 'text-neutral-200',
        ]"
      >
        이번 달 소비:
        {{ budgetStore.summary.monthExpense.toLocaleString() }}원
      </p>
    </div>
  </div>
</template>

<script setup>
import { useBudgetStore } from '@/stores/budget';
import { useUserStore } from '@/stores/user';

const budgetStore = useBudgetStore();
const userStore = useUserStore();
</script>

<style scoped></style>
