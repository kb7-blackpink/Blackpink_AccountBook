<template>
  <section
    :class="[
      'w-full rounded-[20px] border bg-white/10 p-3 shadow-sm transition-colors sm:rounded-3xl sm:p-5',
      isUnlucky ? 'border-violet-200' : 'border-gray-200',
    ]"
  >
    <div
      :class="[
        'calendar-shell overflow-hidden rounded-[20px] border bg-white',
        isUnlucky ? 'border-violet-100' : 'border-gray-100',
      ]"
    >
      <div class="flex items-center justify-center px-3 py-3 sm:px-4">
        <button
          type="button"
          @click="goPrevMonth"
          class="flex h-9 w-9 cursor-pointer items-center justify-center text-2xl font-bold text-black transition hover:text-gray-500 sm:h-12 sm:w-12 sm:text-3xl"
        >
          <
        </button>

        <div class="text-center">
          <h3 class="text-lg font-extrabold text-gray-900 sm:text-2xl">
            {{ calendarTitle }}
          </h3>
        </div>

        <button
          type="button"
          @click="goNextMonth"
          class="flex h-9 w-9 cursor-pointer items-center justify-center text-2xl font-bold text-black transition hover:text-gray-500 sm:h-12 sm:w-12 sm:text-3xl"
        >
          >
        </button>
      </div>

      <VueCal
        ref="calendarRef"
        locale="ko"
        hide-title-bar
        :class="[
          isUnlucky ? 'unlucky-calendar' : 'lucky-calendar',
          'responsive-calendar',
        ]"
        active-view="month"
        :disable-views="['years', 'year', 'week', 'day']"
        :time="false"
        hide-view-selector
        :events-on-month-view="true"
        :events="calendarEvents"
        :selected-date="selectedDate"
        class="cursor-pointer"
        @cell-click="handleCellClick"
      >
        <template #event="{ event }">
          <div
            class="w-full truncate rounded-md px-1.5 py-0.5 text-[9px] font-extrabold leading-none sm:rounded-lg sm:px-2 sm:py-1 sm:text-[11px]"
            :class="getEventClass(event.class)"
          >
            {{ event.title }}
          </div>
        </template>
      </VueCal>
    </div>

    <!-- 날짜 클릭 시 RecentTransactionList -->
    <RecentTransactionList
      v-if="selectedDate"
      class="mt-4"
      :active-filter="selectedDateFilter"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import RecentTransactionList from '@/components/dashboard/RecentTransactionList.vue';
import { storeToRefs } from 'pinia';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { useBudgetStore } from '@/stores/budget';
import { useUserStore } from '@/stores/user';

const calendarRef = ref(null);

const budgetStore = useBudgetStore();
const userStore = useUserStore();

const { calendarEvents, calendarTitle, selectedDate } =
  storeToRefs(budgetStore);

const isUnlucky = computed(() => userStore.mode === 'unlucky');

const selectedDateFilter = computed(() => {
  if (!selectedDate.value) return null;
  return { type: 'date', start: selectedDate.value, end: selectedDate.value };
});

const formatDateToYmd = (value) => {
  if (!value) return '';

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const handleCellClick = (cell) => {
  const rawDate = cell?.startDate || cell?.date || cell;
  const formatted = formatDateToYmd(rawDate);

  if (formatted) {
    budgetStore.setSelectedDate(formatted);
  }
};

const goPrevMonth = () => {
  calendarRef.value?.previous();
  budgetStore.goPrevMonth();
};

const goNextMonth = () => {
  calendarRef.value?.next();
  budgetStore.goNextMonth();
};

const getEventClass = (eventClass) => {
  if (eventClass === 'income-event') {
    return isUnlucky.value ? 'text-violet-700' : 'text-emerald-600';
  }

  return isUnlucky.value ? 'text-fuchsia-600' : 'text-rose-500';
};

onMounted(async () => {
  if (budgetStore.transaction.length === 0) {
    await budgetStore.fetchAllData();
  }
});
</script>

<style scoped>
:deep(.lucky-calendar) {
  --vuecal-primary-color: #84cc16;
  border-color: #84cc16;
}

:deep(.unlucky-calendar) {
  --vuecal-primary-color: #8b5cf6;
  border-color: #8b5cf6;
}

:deep(.responsive-calendar) {
  height: 640px;
}

:deep(.vuecal__title-bar) {
  padding: 14px 16px;
  border-bottom: 1px solid #f3f4f6;
}

:deep(.vuecal__heading) {
  font-size: 15px;
  font-weight: 800;
  color: #111827;
}

:deep(.vuecal__weekdays-headings) {
  border-bottom: 1px solid #f3f4f6;
}

:deep(.vuecal__weekday) {
  font-size: 12px;
  font-weight: 800;
  color: #9ca3af;
}

:deep(.vuecal__cell) {
  background: #ffffff;
}

:deep(.vuecal__cell-content) {
  padding: 6px;
}

:deep(.vuecal__cell-date) {
  font-size: 13px;
  font-weight: 800;
  color: #111827;
}

:deep(.lucky-calendar .vuecal__cell--today) {
  background: #f7fee7;
}

:deep(.lucky-calendar .vuecal__cell--selected) {
  background: #ecfccb;
}

:deep(.unlucky-calendar .vuecal__cell--today) {
  background: #f5f3ff;
}

:deep(.unlucky-calendar .vuecal__cell--selected) {
  background: #ede9fe;
}

:deep(.vuecal__event) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-height: auto !important;
  margin-top: 2px;
}

:deep(.vuecal__event-time) {
  display: none !important;
}

:deep(.vuecal__event-title) {
  display: none !important;
}

:deep(.vuecal__no-event) {
  display: none;
}

@media (max-width: 768px) {
  :deep(.responsive-calendar) {
    height: 420px;
  }

  :deep(.vuecal__title-bar) {
    padding: 10px 12px;
  }

  :deep(.vuecal__heading) {
    font-size: 13px;
  }

  :deep(.vuecal__weekday) {
    font-size: 10px;
  }

  :deep(.vuecal__cell-content) {
    padding: 2px;
  }

  :deep(.vuecal__cell-date) {
    font-size: 11px;
  }

  :deep(.vuecal__event) {
    margin-top: 1px;
  }
}

@media (max-width: 480px) {
  :deep(.responsive-calendar) {
    height: 360px;
  }

  :deep(.vuecal__title-bar) {
    padding: 8px 10px;
  }

  :deep(.vuecal__heading) {
    font-size: 12px;
  }

  :deep(.vuecal__weekday) {
    font-size: 9px;
  }

  :deep(.vuecal__cell-content) {
    padding: 1px;
  }

  :deep(.vuecal__cell-date) {
    font-size: 10px;
  }
}
</style>
