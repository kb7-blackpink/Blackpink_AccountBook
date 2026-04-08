<template>
  <div
    class="h-30 lg:h-50 border rounded-3xl flex-1 px-4 py-3 lg:px-7 lg:py-5 flex flex-col justify-between gap-2.5 lg:gap-4"
    :class="[
      budgetStore.currentMode === 'lucky'
        ? 'border-neutral-400'
        : 'border-white',
    ]"
  >
    <div
      class="pb-1 lg:pb-5 border-b"
      :class="[
        budgetStore.currentMode === 'lucky'
          ? 'border-neutral-400'
          : 'border-white',
      ]"
    >
      <p
        class="text-xs lg:text-lg lg:pb-2"
        :class="[
          budgetStore.currentMode === 'lucky'
            ? 'text-neutral-500'
            : 'text-white',
        ]"
      >
        Total Balance
      </p>
      <p
        class="text-lg font-bold lg:text-3xl"
        :class="[
          budgetStore.currentMode === 'lucky'
            ? 'text-green-500/80'
            : 'text-green-300',
        ]"
      >
        {{ budgetStore.summary.totalBalance }}
      </p>
    </div>

    <div class="flex gap-10">
      <div>
        <p
          class="text-xs lg:text-sm pb-1"
          :class="[
            budgetStore.currentMode === 'lucky'
              ? 'text-neutral-500'
              : 'text-white',
          ]"
        >
          Total Income
        </p>
        <p
          class="font-semibold text-sm lg:text-xl"
          :class="[
            budgetStore.currentMode === 'lucky'
              ? 'text-sky-500/80'
              : 'text-sky-300',
          ]"
        >
          + {{ budgetStore.summary.totalIncome }}
        </p>
      </div>

      <div>
        <p
          class="text-xs lg:text-sm pb-1"
          :class="[
            budgetStore.currentMode === 'lucky'
              ? 'text-neutral-500'
              : 'text-white',
          ]"
        >
          Total Expense
        </p>
        <p
          class="font-semibold text-sm lg:text-xl"
          :class="[
            budgetStore.currentMode === 'lucky'
              ? 'text-red-500/80'
              : 'text-red-400',
          ]"
        >
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
  budgetStore.fetchAllData();
});
</script>

<style scoped></style>
