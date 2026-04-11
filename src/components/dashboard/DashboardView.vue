<template>
  <div class="flex flex-col gap-3 lg:gap-6 lg:px-0">
    <!-- 토글 + 필터 버튼 -->
    <CalendarListToggle
      v-model="currentView"
      @click-filter="
        filterPanelOpen = !filterPanelOpen;
        currentView = 'list';
      "
    />

    <!-- 필터 패널 -->
    <Transition name="slide-down">
      <div
        v-if="filterPanelOpen"
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
              >{{ weekLabel }}</span
            >
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
            @click="resetFilter"
            class="tab-inactive flex-1 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold text-app-muted rounded-lg transition-colors"
          >
            초기화
          </button>
          <button
            @click="applyFilter"
            class="flex-1 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold text-white rounded-lg transition-colors apply-btn"
          >
            적용
          </button>
        </div>
      </div>
    </Transition>

    <!-- 활성 필터 뱃지 -->
    <div v-if="activeFilter" class="flex items-center gap-1.5">
      <span
        class="text-xs px-2.5 py-1 rounded-full font-medium border"
        :class="
          isLucky
            ? 'bg-[#f0f7d4] border-[#C0E068] text-[#7a9e2e]'
            : 'bg-transparent border-violet-300/50 text-violet-200'
        "
      >
        {{ filterLabel }}
      </span>
      <button @click="resetFilter" class="text-app-muted filter-badge-close">
        <svg
          class="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- 뷰 전환 -->
    <CalendarSection v-if="currentView === 'calendar'" />
    <RecentTransactionList v-else :active-filter="activeFilter" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import CalendarListToggle from '@/components/common/CalendarListToggle.vue';
import CalendarSection from '@/components/dashboard/CalendarSection.vue';
import RecentTransactionList from '@/components/dashboard/RecentTransactionList.vue';
import { Calendar } from 'lucide-vue-next';

const userStore = useUserStore();
const { isLucky } = storeToRefs(userStore);

// ── 뷰 전환 ───────────────────────────────────────
const currentView = ref('calendar');

// 뷰가 캘린더로 바뀌면 필터 닫기 + 활성 필터 라벨 제거
watch(currentView, (newView) => {
  if (newView === 'calendar') {
    filterPanelOpen.value = false;
    activeFilter.value = null;
  }
});

// ── 필터 패널 ─────────────────────────────────────
const FILTER_TABS = [
  { label: '날짜', value: 'date' },
  { label: '주간', value: 'week' },
  { label: '월별', value: 'month' },
  { label: '기간별', value: 'range' },
];

const filterPanelOpen = ref(false);
const filterType = ref('month');
const activeFilter = ref(null);

const pad = (n) => String(n).padStart(2, '0');
const toStr = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = new Date();

const filterDate = ref(toStr(today));

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

const filterRangeStart = ref(
  toStr(new Date(today.getFullYear(), today.getMonth(), 1)),
);
const filterRangeEnd = ref(toStr(today));

const applyFilter = () => {
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
  activeFilter.value = map[filterType.value];
  filterPanelOpen.value = false;
};

const resetFilter = () => {
  activeFilter.value = null;
  filterPanelOpen.value = false;
};

const filterLabel = computed(() => {
  if (!activeFilter.value) return '';
  const { type, start, end } = activeFilter.value;
  if (type === 'date') return start;
  if (type === 'month')
    return `${activeFilter.value.year}년 ${activeFilter.value.month}월`;
  return `${start} ~ ${end}`;
});
</script>

<style scoped>
/* 날짜 관련 설정 */
/* 인풋 텍스트 자체 정렬 */
.custom-date-input {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 날짜 편집 영역 정렬 (Chrome, Safari용 핵심 설정) */
.custom-date-input::-webkit-datetime-edit {
  display: flex;
  justify-content: center;
  width: 100%;
}
/* 캘린더 아이콘 숨기기 및 전체 영역 클릭 가능하게 */
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
/* 특정 브라우저에서 텍스트가 왼쪽으로 쏠리는 것 방지 */
.custom-date-input::-webkit-datetime-edit-fields-wrapper {
  display: flex;
  justify-content: center;
  flex: 1;
}

/* 슬라이드 관련 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* 활성 탭: lucky → --color-brand, unlucky → --color-btn-primary */
.tab-active {
  background-color: var(--color-brand);
}
.theme-unlucky .tab-active {
  background-color: var(--color-btn-primary);
}

/* 비활성 탭 */
.tab-inactive {
  background-color: color-mix(in srgb, var(--color-text) 8%, transparent);
}
.tab-inactive:hover {
  background-color: color-mix(in srgb, var(--color-text) 14%, transparent);
}

/* 주간/월별 화살표 버튼 */
.nav-btn:hover {
  background-color: color-mix(in srgb, var(--color-text) 8%, transparent);
}

/* 초기화 버튼 */
.cancel-btn {
  background-color: var(--color-btn-cancel);
}

/* 적용 버튼 */
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

/* 활성 필터 뱃지 */
.filter-badge {
  background-color: color-mix(in srgb, var(--color-brand) 25%, transparent);
  color: color-mix(in srgb, var(--color-brand) 60%, #000);
}
.theme-unlucky .filter-badge {
  background-color: color-mix(
    in srgb,
    var(--color-btn-primary) 20%,
    transparent
  );
  color: var(--color-btn-primary);
}

/* 뱃지 닫기 버튼 */
.filter-badge-close:hover {
  color: var(--color-text);
}
</style>
