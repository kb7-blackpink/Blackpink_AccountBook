<template>
  <div class="p-6 pb-24 space-y-8 min-h-screen transition-colors duration-500">
    <!-- 지출 내용 있을 때 & 반응형 -->
    <div
      v-if="budgetStore.transaction.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
    >
      <!-- category donut -->
      <div>
        <div class="text-center text-lg font-semibold mb-4">
          카테고리별 지출
        </div>
        <div class="h-64">
          <Doughnut :data="categoryChartData" :options="CHART_OPTIONS.DONUT" />
        </div>
      </div>

      <!-- bar chart -->
      <div>
        <div class="text-center text-lg font-semibold mb-4">
          이번 주 지출 추이
        </div>
        <div class="h-64">
          <Bar :data="barChartData" :options="CHART_OPTIONS.BAR" />
        </div>
      </div>
    </div>

    <!-- 지출 내용 없을 때 -->
    <div v-else class="flex flex-col items-center justify-center h-[60vh]">
      <span class="text-6xl mb-4 animate-bounce">💸</span>
      <div>분석할 지출 내역이 없어요.</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { Doughnut, Bar } from 'vue-chartjs';
import { useBudgetStore } from '@/stores/budget';
import { useUserStore } from '@/stores/user';
import { CHART_OPTIONS } from '@/constants/chartOptions';
import { getCategoryChartData } from '@/services/chart/categoryChartService';
import { getBarChartData } from '@/services/chart/barChartService';

const budgetStore = useBudgetStore();
const userStore = useUserStore();

const categoryChartData = computed(() =>
  getCategoryChartData(budgetStore.transaction, userStore.mode),
);
const barChartData = computed(() =>
  getBarChartData(budgetStore.transaction, userStore.mode),
);

onMounted(async () => {
  await Promise.all([budgetStore.fetchAllData(), userStore.fetchUserMode()]);
});
</script>
