<template>
  <div
    class="p-6 pb-24 space-y-8 min-h-screen transition-colors duration-500 bg-app text-app"
  >
    <StatHeader
      :year="currentYear"
      :month="currentMonth"
      @change="changeMonth"
    />

    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center h-[60vh]"
    >
      <div class="flex space-x-1">
        <span class="animate-bounce" style="animation-delay: 0.1s">로</span>
        <span class="animate-bounce" style="animation-delay: 0.2s">딩</span>
        <span class="animate-bounce" style="animation-delay: 0.3s">중</span>
        <span class="animate-bounce" style="animation-delay: 0.4s">.</span>
        <span class="animate-bounce" style="animation-delay: 0.5s">.</span>
        <span class="animate-bounce" style="animation-delay: 0.6s">.</span>
      </div>
    </div>

    <div
      v-else-if="filteredTransactions.length > 0"
      class="flex flex-col gap-8"
    >
      <div class="flex flex-col gap-1 lg:gap-2">
        <div class="flex flex-col lg:flex-row justify-center gap-3 lg:gap-6">
          <TotalCard class="flex-[7]" />
          <MonthDiff class="flex-[3]" />
        </div>

        <TextBar :show-button="false" class="w-full" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoryChart
          :chartData="categoryChartData"
          :options="dynamicOptions.DONUT"
        />
        <BarChart
          v-model:view="currentView"
          :chartData="barChartData"
          :options="dynamicOptions.BAR"
          :mode="userStore.mode"
        />
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center h-[60vh]">
      <span class="text-6xl mb-4 animate-bounce">💸</span>
      <div>분석할 지출 내역이 없어요.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import MonthDiff from '@/components/MonthDiff.vue';
import TextBar from '@/components/TextBar.vue';
import TotalCard from '@/components/TotalCard.vue';
import StatHeader from '@/components/charts/StatHeader.vue';
import CategoryChart from '@/components/charts/CategoryChart.vue';
import BarChart from '@/components/charts/BarChart.vue';

import { useBudgetStore } from '@/stores/budget';
import { useUserStore } from '@/stores/user';
import { getChartOptions } from '@/services/chart/chartOptions';
import { getCategoryChartData } from '@/services/chart/categoryChartService';
import { getBarChartData } from '@/services/chart/barChartService';

const isLoading = ref(true);

const budgetStore = useBudgetStore();
const userStore = useUserStore();
const currentView = ref('일별');

const currentYear = computed(() => {
  const date = new Date(budgetStore.currentCalendarDate);
  return date.getFullYear();
});

const currentMonth = computed(() => {
  const date = new Date(budgetStore.currentCalendarDate);
  return date.getMonth() + 1;
});

const changeMonth = (diff) => {
  if (diff < 0) {
    budgetStore.goPrevMonth();
  } else {
    budgetStore.goNextMonth();
  }
};

const filteredTransactions = computed(() => {
  return budgetStore.transaction.filter((t) => {
    const tDate = new Date(t.date);
    return (
      tDate.getFullYear() === currentYear.value &&
      tDate.getMonth() + 1 === currentMonth.value
    );
  });
});

const categoryChartData = computed(() =>
  getCategoryChartData(filteredTransactions.value, userStore.mode),
);

const barChartData = computed(() =>
  getBarChartData(
    currentView.value === '월별'
      ? budgetStore.transaction
      : filteredTransactions.value,
    userStore.mode,
    currentView.value,
    currentYear.value,
    currentMonth.value,
  ),
);

const dynamicOptions = computed(() => getChartOptions(userStore.mode));

onMounted(async () => {
  isLoading.value = true;
  try {
    userStore.loadUserFromStorage();
    await budgetStore.fetchAllData();
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.loading-dots::after {
  content: '.';
  animation: dots 1.5s steps(5, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    content: '.';
  }
  40% {
    content: '..';
  }
  60% {
    content: '...';
  }
  80%,
  100% {
    content: '';
  }
}
</style>
