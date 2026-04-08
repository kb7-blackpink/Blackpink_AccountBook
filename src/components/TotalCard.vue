<template>
  <div
    class="h-30 lg:h-50 border rounded-3xl flex-1 px-4 py-3 lg:px-7 lg:py-5 flex flex-col justify-between gap-2.5 lg:gap-4 transition-colors duration-500"
    :class="[
      userStore.mode === 'lucky'
        ? 'border-neutral-400 bg-white'
        : 'border-white/30  bg-white/10',
    ]"
  >
    <div
      class="pb-1 lg:pb-5 border-b"
      :class="[
        userStore.mode === 'lucky' ? 'border-neutral-400' : 'border-white/30',
      ]"
    >
      <p
        class="text-xs lg:text-lg lg:pb-2"
        :class="[
          userStore.mode === 'lucky' ? 'text-neutral-500' : 'text-white',
        ]"
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
          class="text-xs lg:text-sm pb-1"
          :class="[
            userStore.mode === 'lucky' ? 'text-neutral-500' : 'text-white',
          ]"
        >
          Total Income
        </p>
        <p
          class="font-semibold text-sm lg:text-xl"
          :class="[
            userStore.mode === 'lucky' ? 'text-sky-500/80' : 'text-sky-300',
          ]"
        >
          + {{ budgetStore.summary.totalIncome.toLocaleString() }}
        </p>
      </div>

      <div>
        <p
          class="text-xs lg:text-sm pb-1"
          :class="[
            userStore.mode === 'lucky' ? 'text-neutral-500' : 'text-white',
          ]"
        >
          Total Expense
        </p>
        <p
          class="font-semibold text-sm lg:text-xl"
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
