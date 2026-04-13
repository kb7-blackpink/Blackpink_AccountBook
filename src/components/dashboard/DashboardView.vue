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
      <FilterPanel
        v-if="filterPanelOpen"
        @apply="onFilterApply"
        @reset="onFilterReset"
      />
    </Transition>

    <!-- 필터 뱃지 -->
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
      <button @click="onFilterReset" class="text-app-muted filter-badge-close">
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
import FilterPanel from '@/components/dashboard/FilterPanel.vue';

const userStore = useUserStore();
const { isLucky } = storeToRefs(userStore);

// ── 뷰 전환 ───────────────────────────────────────
const currentView = ref('calendar');

// ── 달력으로 전환 시 필터 패널 + 필터 초기화 ────
watch(currentView, (newView) => {
  if (newView === 'calendar') {
    filterPanelOpen.value = false;
    activeFilter.value = null;
  }
});

// ── 필터 패널 열림 상태 ───────────────────────────
const filterPanelOpen = ref(false);

// ── 활성 필터 (FilterPanel이 emit한 값 보관) ───────
const activeFilter = ref(null);

const onFilterApply = (filter) => {
  activeFilter.value = filter;
  filterPanelOpen.value = false;
};

const onFilterReset = () => {
  activeFilter.value = null;
  filterPanelOpen.value = false;
};

// ── 필터 라벨 ─────────────────────────────────────
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

/* 뱃지 닫기 버튼 */
.filter-badge-close:hover {
  color: var(--color-text);
}
</style>
