<template>
  <div class="p-6 pb-24 space-y-8 min-h-screen transition-colors duration-500 bg-app text-app">
    <StatHeader 
      :year="currentYear" 
      :month="currentMonth" 
      @change="changeMonth" 
    />

    <div v-if="filteredTransactions.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
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

    <div v-else class="flex flex-col items-center justify-center h-[60vh]">
      <span class="text-6xl mb-4 animate-bounce">💸</span>
      <div>분석할 지출 내역이 없어요.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import StatHeader from '@/components/charts/StatHeader.vue';
import CategoryChart from '@/components/charts/CategoryChart.vue';
import BarChart from '@/components/charts/BarChart.vue';

import { useBudgetStore } from '@/stores/budget';
import { useUserStore } from '@/stores/user';
import { getChartOptions } from '@/services/chart/chartOptions';
import { getCategoryChartData } from '@/services/chart/categoryChartService';
import { getBarChartData } from '@/services/chart/barChartService';

const budgetStore = useBudgetStore();
const userStore = useUserStore();
const currentView = ref('일별');

// 월 관리 로직
const currentDate = ref(new Date());
const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth() + 1);

const changeMonth = (diff) => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + diff);
  currentDate.value = newDate;
};

// 데이터 필터링 로직
const filteredTransactions = computed(() => {
  return budgetStore.transaction.filter((t) => {
    const tDate = new Date(t.date);
    return (
      tDate.getFullYear() === currentYear.value &&
      tDate.getMonth() + 1 === currentMonth.value
    );
  });
});

// 차트 데이터에 필터링된 결과 전달
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

// 가져올 차트 종류
const dynamicOptions = computed(() => getChartOptions(userStore.mode));

// 현재 모드, 데이터 가져옴
onMounted(async () => {
  await Promise.all([
    budgetStore.fetchAllData(),
    userStore.loadUserFromStorage
      ? userStore.loadUserFromStorage()
      : userStore.fetchUserMode(),
  ]);
});
</script>
