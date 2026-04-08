<template>
  <div
    class="p-6 pb-24 space-y-8 min-h-screen transition-colors duration-500"
    :class="[
      userStore.mode === 'lucky' ? 'bg-white' : 'border-white bg-transparent',
    ]"
  >
    <!-- 지출 내용 있을 때 & 반응형 -->
    <div
      v-if="budgetStore.transaction.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
    >
      <!-- category donut -->
      <BaseCard>
        <div
          class="text-center text-lg font-semibold mb-4"
          :class="
            userStore.mode === 'lucky' ? 'text-[#548c00]' : 'text-[#ffffff]'
          "
        >
          카테고리별 지출
        </div>
        <div class="h-64">
          <Doughnut :data="categoryChartData" :options="CHART_OPTIONS.DONUT" />
        </div>
      </BaseCard>

      <!-- bar chart -->
      <BaseCard>
        <div
          class="text-center text-lg font-semibold mb-4"
          :class="
            userStore.mode === 'lucky' ? 'text-[#548c00]' : 'text-[#ffffff]'
          "
        >
          이번 주 지출 추이
        </div>
        <div class="h-64">
          <Bar :data="weeklyChartData" :options="CHART_OPTIONS.BAR" />
        </div>
      </BaseCard>
    </div>

    <!-- 지출 내용 없을 때 -->
    <div v-else class="flex flex-col items-center justify-center h-[60vh]">
      <span class="text-6xl mb-4 animate-bounce">💸</span>
      <div
        :class="userStore.mode === 'lucky' ? 'text-gray-400' : 'text-white/60'"
      >
        분석할 지출 내역이 없어요.
      </div>
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
import { getWeeklyChartData } from '@/services/chart/weeklyChartService';

import BaseCard from '@/components/common/BaseCard.vue';

const budgetStore = useBudgetStore();
const userStore = useUserStore();

const categoryChartData = computed(() =>
  getCategoryChartData(budgetStore.transaction),
);
const weeklyChartData = computed(() =>
  getWeeklyChartData(budgetStore.transaction),
);

onMounted(async () => {
  await Promise.all([budgetStore.fetchAllData(), userStore.fetchUserMode()]);
});
</script>
