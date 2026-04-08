<template>
  <div class="p-6 pb-24 space-y-8 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">소비 분석</h1>

    <template v-if="budgetStore.transaction.length > 0">
      <div class="bg-white p-6 rounded-[30px] shadow-sm">
        <h2 class="text-lg font-semibold mb-4 text-[#548c00]">카테고리별 지출</h2>
        <div class="h-62.5">
          <Doughnut :data="categoryChartData" :options="CHART_OPTIONS.DONUT" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-[30px] shadow-sm">
        <h2 class="text-lg font-semibold mb-4 text-[#201a61]">이번 주 지출 추이</h2>
        <div class="h-62.5">
          <Bar :data="weeklyChartData" :options="CHART_OPTIONS.BAR" />
        </div>
      </div>
    </template>

    <div v-else class="flex flex-col items-center justify-center h-[60vh]">
      <span class="text-6xl mb-4">💸</span>
      <p class="text-gray-400">분석할 지출 내역이 없어요.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { Doughnut, Bar } from 'vue-chartjs';
import { useBudgetStore } from '@/stores/budget';
import { CHART_OPTIONS } from '@/constants/chartOptions';
import { getCategoryChartData } from '@/services/chart/categoryChartService';
import { getWeeklyChartData } from '@/services/chart/weeklyChartService';

const budgetStore = useBudgetStore();

// 스토어의 transaction 데이터가 변경될 때마다 차트 데이터 자동 갱신
const categoryChartData = computed(() => getCategoryChartData(budgetStore.transaction));
const weeklyChartData = computed(() => getWeeklyChartData(budgetStore.transaction));

onMounted(async () => {
  // 앱 진입 시 혹은 페이지 진입 시 데이터 로드
  await budgetStore.fetchAllData();
});
</script>