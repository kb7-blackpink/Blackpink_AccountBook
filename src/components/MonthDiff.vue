<template>
  <div
    class="flex h-30 w-40 flex-col justify-between rounded-3xl border px-4 py-3 lg:h-50 lg:w-60 lg:px-7 lg:py-5"
    :class="[
      userStore.mode === 'lucky'
        ? 'bg-app border-app'
        : 'border-white/30 bg-white/10',
    ]"
  >
    <div :class="[userStore.mode === 'lucky' ? 'text-app' : 'text-white']">
      <p class="text-sm font-bold lg:text-2xl">
        지난 달 이 때보다 <br />
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
        class="text-xs lg:text-sm"
        :class="[
          userStore.mode === 'lucky' ? 'text-app-muted' : 'text-neutral-100',
        ]"
      >
        지난 달 소비:
        {{ budgetStore.summary.lastMonthExpense.toLocaleString() }}원
      </p>
      <p
        class="text-xs lg:text-sm"
        :class="[
          userStore.mode === 'lucky' ? 'text-app-muted' : 'text-neutral-100',
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
import { useUserStore } from '@/stores/user';

const budgetStore = useBudgetStore();
const userStore = useUserStore();

onMounted(() => {
  budgetStore.fetchAllData();
  userStore.fetchUserMode();
});
</script>

<style scoped></style>
