<template>
  <div class="p-6 pb-24 space-y-8 min-h-screen transition-colors duration-500">
    <!-- home 페이지로 이동 -->
    <RouterLink
      to="/home"
      class="flex items-center gap-2"
      :class="userStore.mode === 'lucky' ? 'text-gray-800' : 'text-white'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </RouterLink>

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
          <Doughnut :data="categoryChartData" :options="dynamicOptions.DONUT" />
        </div>
      </div>

      <!-- bar chart -->
      <div>
        <div class="text-center text-lg font-semibold mb-4">
          이번 주 지출 추이
        </div>
        <div class="h-64">
          <Bar :data="barChartData" :options="dynamicOptions.BAR" />
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
import { getChartOptions } from '@/services/chart/chartOptions';
import { getCategoryChartData } from '@/services/chart/categoryChartService';
import { getBarChartData } from '@/services/chart/barChartService';

const budgetStore = useBudgetStore();
const userStore = useUserStore();

// userStore.mode가 바뀔 때마다 차트 옵션 다시 계산
const dynamicOptions = computed(() => getChartOptions(userStore.mode));

const categoryChartData = computed(() =>
  getCategoryChartData(budgetStore.transaction, userStore.mode),
);
const barChartData = computed(() =>
  getBarChartData(budgetStore.transaction, userStore.mode),
);

onMounted(async () => {
  await Promise.all([budgetStore.fetchAllData(), userStore.changeMode()]);
});
</script>
