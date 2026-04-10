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
        class="w-full rounded-xl border border-app bg-app p-3 shadow-sm space-y-3"
      >
        <!-- 필터 타입 탭 -->
        <div class="flex gap-1.5">
          <button
            v-for="tab in FILTER_TABS"
            :key="tab.value"
            @click="filterType = tab.value"
            class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors"
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
        <div v-if="filterType === 'date'">
          <input
            type="date"
            v-model="filterDate"
            class="w-full rounded-lg border border-app px-3 py-2 text-sm bg-app text-app focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- 주간 -->
        <div v-else-if="filterType === 'week'" class="flex items-center gap-2">
          <button
            @click="shiftWeek(-1)"
            class="p-1.5 rounded-lg nav-btn text-app-muted"
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
          <span class="flex-1 text-center text-sm font-medium text-app">{{
            weekLabel
          }}</span>
          <button
            @click="shiftWeek(1)"
            class="p-1.5 rounded-lg nav-btn text-app-muted"
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
        <div v-else-if="filterType === 'month'" class="flex items-center gap-2">
          <button
            @click="shiftMonth(-1)"
            class="p-1.5 rounded-lg nav-btn text-app-muted"
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
          <span class="flex-1 text-center text-sm font-medium text-app">{{
            monthLabel
          }}</span>
          <button
            @click="shiftMonth(1)"
            class="p-1.5 rounded-lg nav-btn text-app-muted"
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

        <!-- 기간별 -->
        <div v-else-if="filterType === 'range'" class="flex items-center gap-2">
          <input
            type="date"
            v-model="filterRangeStart"
            class="flex-1 rounded-lg border border-app px-2 py-2 text-sm bg-app text-app focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span class="text-app-soft text-sm shrink-0">~</span>
          <input
            type="date"
            v-model="filterRangeEnd"
            :min="filterRangeStart"
            class="flex-1 rounded-lg border border-app px-2 py-2 text-sm bg-app text-app focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- 초기화 / 적용 -->
        <div class="flex gap-2 pt-1">
          <button
            @click="resetFilter"
            class="flex-1 py-1.5 text-xs font-medium text-app-muted cancel-btn rounded-lg transition-colors"
          >
            초기화
          </button>
          <button
            @click="applyFilter"
            class="flex-1 py-1.5 text-xs font-semibold text-white rounded-lg transition-colors apply-btn"
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
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import CalendarListToggle from '@/components/common/CalendarListToggle.vue';
import CalendarSection from '@/components/dashboard/CalendarSection.vue';
import RecentTransactionList from '@/components/dashboard/RecentTransactionList.vue';

const userStore = useUserStore();
const { isLucky } = storeToRefs(userStore);

// ── 뷰 전환 ───────────────────────────────────────
const currentView = ref('list');

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

const monthOffset = ref(0);
const monthRange = computed(() => {
  const d = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset.value,
    1,
  );
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
const shiftMonth = (dir) => {
  monthOffset.value += dir;
};

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
