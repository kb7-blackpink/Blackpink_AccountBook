<template>
  <div
    class="p-6 pb-24 space-y-8 min-h-screen transition-colors duration-500 bg-app text-app"
  >
    <div class="flex items-center justify-between mb-6">
      <!-- Home 페이지로 이동 -->
      <RouterLink to="/home" class="p-2 transition-transform active:scale-90">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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

      <!-- 월 바꾸기 -->
      <div class="flex items-center gap-4 text-xl font-bold">
        <button
          @click="changeMonth(-1)"
          class="p-2 hover:opacity-70 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <span class="min-w-30 text-center"
          >{{ currentYear }}년 {{ currentMonth }}월</span
        >

        <button
          @click="changeMonth(1)"
          class="p-2 hover:opacity-70 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div class="w-12"></div>
    </div>

    <!-- 지출 내용 있을 때 & 반응형 -->
    <div
      v-if="filteredTransactions.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
    >
      <!-- category donut -->
      <div class="border border-solid rounded-2xl p-6 bg-app shadow-sm">
        <div class="text-start text-lg font-semibold mb-4">카테고리별 지출</div>
        <div class="h-64">
          <Doughnut :data="categoryChartData" :options="dynamicOptions.DONUT" />
        </div>
      </div>

      <!-- bar chart -->
      <div>
        <div class="text-start text-lg font-semibold mb-4">
          기간별 지출 추이
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
import { ref, computed, onMounted } from 'vue';
import { Doughnut, Bar } from 'vue-chartjs';
import { useBudgetStore } from '@/stores/budget';
import { useUserStore } from '@/stores/user';
import { getChartOptions } from '@/services/chart/chartOptions';
import { getCategoryChartData } from '@/services/chart/categoryChartService';
import { getBarChartData } from '@/services/chart/barChartService';

const budgetStore = useBudgetStore();
const userStore = useUserStore();

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
  getBarChartData(filteredTransactions.value, userStore.mode),
);

// 가져올 차트 종류
const dynamicOptions = computed(() => getChartOptions(userStore.mode));

// 현재 모드, 데이터 가져옴
onMounted(async () => {
  await Promise.all([budgetStore.fetchAllData(), userStore.fetchUserMode()]);
});
</script>
