<template>
  <div
    class="w-full rounded-xl border bg-app p-3 space-y-3"
    :class="isLucky ? 'border-app' : 'border-white/30'"
  >
    <!-- 필터 타입 탭 -->
    <div class="flex gap-1.5">
      <button
        v-for="tab in FILTER_TABS"
        :key="tab.value"
        @click="filterType = tab.value"
        class="flex-1 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold rounded-lg transition-colors"
        :class="
          filterType === tab.value
            ? 'tab-active text-white'
            : 'tab-inactive text-app-muted'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 날짜 -->
    <div v-if="filterType === 'date'" class="relative w-full h-10 lg:h-11">
      <div
        class="absolute inset-0 flex items-center justify-center gap-2 border rounded-lg bg-app pointer-events-none"
        :class="isLucky ? 'border-app' : 'border-white/30'"
      >
        <span class="text-sm ml:font-medium lg:font-semibold text-app">{{
          filterDate
        }}</span>
        <Calendar class="w-3.5 h-3.5 text-app-muted" />
      </div>
      <input
        type="date"
        v-model="filterDate"
        class="custom-date-input absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>

    <!-- 주간 -->
    <div
      v-else-if="filterType === 'week'"
      class="flex items-center gap-2 h-10 lg:h-11"
    >
      <button
        @click="shiftWeek(-1)"
        class="h-full px-2 rounded-lg nav-btn text-app-muted shrink-0 border border-transparent"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div
        class="relative flex-1 h-full flex items-center justify-center gap-2 border rounded-lg bg-app px-2"
        :class="isLucky ? 'border-app' : 'border-white/30'"
      >
        <span
          class="text-sm ml:font-medium lg:font-semibold text-app whitespace-nowrap"
        >
          {{ weekLabel }}
        </span>
      </div>

      <button
        @click="shiftWeek(1)"
        class="h-full px-2 rounded-lg nav-btn text-app-muted shrink-0 border border-transparent"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <!-- 월별 -->
    <div
      v-else-if="filterType === 'month'"
      class="flex items-center gap-2 h-10 lg:h-11"
    >
      <div
        class="relative flex-1 h-full flex items-center justify-center gap-2 border rounded-lg bg-app"
        :class="isLucky ? 'border-app' : 'border-white/30'"
      >
        <span class="text-sm ml:font-medium lg:font-semibold text-app">{{
          monthLabel
        }}</span>
        <Calendar class="w-3.5 h-3.5 text-app-muted" />
        <input
          type="month"
          v-model="selectedMonth"
          class="custom-date-input absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>

    <!-- 기간별 -->
    <div
      v-else-if="filterType === 'range'"
      class="flex items-center gap-2 h-10 lg:h-11"
    >
      <div class="relative flex-1 h-full">
        <div
          class="absolute inset-0 flex items-center justify-center gap-1.5 border rounded-lg bg-app pointer-events-none"
          :class="isLucky ? 'border-app' : 'border-white/30'"
        >
          <span class="text-sm ml:font-medium lg:font-semibold text-app">{{
            filterRangeStart
          }}</span>
          <Calendar class="w-3.5 h-3.5 text-app-muted" />
        </div>
        <input
          type="date"
          v-model="filterRangeStart"
          class="custom-date-input absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <span
        class="text-app-soft text-sm ml:font-medium lg:font-semibold shrink-0"
        >~</span
      >

      <div class="relative flex-1 h-full">
        <div
          class="absolute inset-0 flex items-center justify-center gap-1.5 border rounded-lg bg-app pointer-events-none"
          :class="isLucky ? 'border-app' : 'border-white/30'"
        >
          <span class="text-sm ml:font-medium lg:font-semibold text-app">{{
            filterRangeEnd
          }}</span>
          <Calendar class="w-3.5 h-3.5 text-app-muted" />
        </div>
        <input
          type="date"
          v-model="filterRangeEnd"
          :min="filterRangeStart"
          class="custom-date-input absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>

    <!-- 초기화 / 적용 -->
    <div class="flex gap-2 pt-1">
      <button
        @click="handleReset"
        class="tab-inactive flex-1 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold text-app-muted rounded-lg transition-colors"
      >
        초기화
      </button>
      <button
        @click="handleApply"
        class="flex-1 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold text-white rounded-lg transition-colors apply-btn"
      >
        적용
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { Calendar } from 'lucide-vue-next';

const userStore = useUserStore();
const { isLucky } = storeToRefs(userStore);

const emit = defineEmits(['apply', 'reset']);

const FILTER_TABS = [
  { label: '날짜', value: 'date' },
  { label: '주간', value: 'week' },
  { label: '월별', value: 'month' },
  { label: '기간별', value: 'range' },
];

const filterType = ref('month');

const pad = (n) => String(n).padStart(2, '0');
const toStr = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = new Date();

// 날짜
const filterDate = ref(toStr(today));

// 주간
const weekOffset = ref(0);
const weekRange = computed(() => {
  const base = new Date(today);
  base.setDate(today.getDate() - today.getDay() + weekOffset.value * 7);
  const end = new Date(base);
  end.setDate(base.getDate() + 6);
  return { start: toStr(base), end: toStr(end) };
});
const weekLabel = computed(
  () => `${weekRange.value.start} ~ ${weekRange.value.end}`,
);
const shiftWeek = (dir) => {
  weekOffset.value += dir;
};

// 월별
const selectedMonth = ref(
  `${today.getFullYear()}-${pad(today.getMonth() + 1)}`,
);
const monthRange = computed(() => {
  const [year, month] = selectedMonth.value.split('-').map(Number);
  const d = new Date(year, month - 1, 1);
  return {
    start: toStr(d),
    end: toStr(new Date(d.getFullYear(), d.getMonth() + 1, 0)),
    year: d.getFullYear(),
    month: d.getMonth() + 1,
  };
});
const monthLabel = computed(
  () => `${monthRange.value.year}년 ${monthRange.value.month}월`,
);

// 기간별
const filterRangeStart = ref(
  toStr(new Date(today.getFullYear(), today.getMonth(), 1)),
);
const filterRangeEnd = ref(toStr(today));

// 적용
const handleApply = () => {
  const map = {
    date: { type: 'date', start: filterDate.value, end: filterDate.value },
    week: { type: 'week', ...weekRange.value },
    month: { type: 'month', ...monthRange.value },
    range: {
      type: 'range',
      start: filterRangeStart.value,
      end: filterRangeEnd.value,
    },
  };
  emit('apply', map[filterType.value]);
};

// 초기화
const handleReset = () => {
  emit('reset');
};
</script>

<style scoped>
.custom-date-input {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-date-input::-webkit-datetime-edit {
  display: flex;
  justify-content: center;
  width: 100%;
}
.custom-date-input::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  color: transparent;
  cursor: pointer;
}
.custom-date-input::-webkit-datetime-edit-fields-wrapper {
  display: flex;
  justify-content: center;
  flex: 1;
}

.tab-active {
  background-color: var(--color-brand);
}
.theme-unlucky .tab-active {
  background-color: var(--color-btn-primary);
}

.tab-inactive {
  background-color: color-mix(in srgb, var(--color-text) 8%, transparent);
}
.tab-inactive:hover {
  background-color: color-mix(in srgb, var(--color-text) 14%, transparent);
}

.nav-btn:hover {
  background-color: color-mix(in srgb, var(--color-text) 8%, transparent);
}

.apply-btn {
  background-color: var(--color-brand);
}
.apply-btn:hover {
  background-color: color-mix(in srgb, var(--color-brand) 85%, #000);
}
.theme-unlucky .apply-btn {
  background-color: var(--color-btn-primary);
}
.theme-unlucky .apply-btn:hover {
  background-color: color-mix(in srgb, var(--color-btn-primary) 85%, #000);
}
</style>
