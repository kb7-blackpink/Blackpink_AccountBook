<template>
  <div
    class="flex h-30 flex-1 flex-col justify-between gap-2.5 rounded-3xl border px-4 py-3 transition-colors duration-500 lg:h-50 lg:gap-4 lg:px-7 lg:py-5"
    :class="[
      userStore.mode === 'lucky'
        ? 'border-app bg-app'
        : 'border-white/30 bg-white/10',
    ]"
  >
    <div
      class="border-b pb-1 lg:pb-5"
      :class="[userStore.mode === 'lucky' ? 'border-app' : 'border-white/30']"
    >
      <p
        class="text-xs lg:pb-2 lg:text-lg"
        :class="[userStore.mode === 'lucky' ? 'text-app-muted' : 'text-white']"
      >
        Total Balance
      </p>
      <p
        class="text-lg font-bold lg:text-3xl"
        :class="[
          userStore.mode === 'lucky' ? 'text-green-500/80' : 'text-green-300',
        ]"
      >
        {{ budgetStore.summary.totalBalance.toLocaleString() }}
      </p>
    </div>

    <div class="flex gap-10">
      <div>
        <p
          class="pb-1 text-xs lg:text-sm"
          :class="[
            userStore.mode === 'lucky' ? 'text-app-muted' : 'text-white',
          ]"
        >
          Total Income
        </p>
        <p
          class="text-sm font-semibold lg:text-xl"
          :class="[
            userStore.mode === 'lucky' ? 'text-sky-500/80' : 'text-sky-300',
          ]"
        >
          + {{ budgetStore.summary.totalIncome.toLocaleString() }}
        </p>
      </div>

      <div>
        <p
          class="pb-1 text-xs lg:text-sm"
          :class="[
            userStore.mode === 'lucky' ? 'text-app-muted' : 'text-white',
          ]"
        >
          Total Expense
        </p>
        <p
          class="text-sm font-semibold lg:text-xl"
          :class="[
            userStore.mode === 'lucky' ? 'text-red-500/80' : 'text-red-400',
          ]"
        >
          - {{ budgetStore.summary.totalExpense.toLocaleString() }}
        </p>
      </div>
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
