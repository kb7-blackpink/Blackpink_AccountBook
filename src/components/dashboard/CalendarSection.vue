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
            class="calendar-event-text w-full rounded-md px-1 py-0.5 font-extrabold leading-none sm:px-2 sm:py-1"
            :class="getEventClass(event.class)"
          >
            {{ event.title }}
          </div>
        </template>
      </VueCal>
    </div>

    <RecentTransactionList
      v-if="selectedDate"
      :key="selectedDate"
      class="mt-4"
      :active-filter="selectedDateFilter"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
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
    budgetStore.setCurrentCalendarDate(formatted);
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

  window.addEventListener('transactionAdded', budgetStore.fetchAllData);
});

onUnmounted(() => {
  window.removeEventListener('transactionAdded', budgetStore.fetchAllData);
});
</script>

<style scoped>
/* 셀 내부 요소 포인터 이벤트 방지 -> 셀 아무 곳을 클릭해도 handleCellClick 진행 */
:deep(.vuecal__event),
:deep(.calendar-event-text),
:deep(.vuecal__event-title),
:deep(.vuecal__event-time),
:deep(.vuecal__cell-date) {
  pointer-events: none !important;
}

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
  height: 44px;
  min-height: 44px;
  max-height: 44px;
  border-bottom: 1px solid #f3f4f6;
}

:deep(.vuecal__weekday) {
  font-size: 12px;
  font-weight: 800;
  color: #9ca3af;
}

:deep(.vuecal__body) {
  height: calc(640px - 44px) !important;
}

:deep(.vuecal__cell) {
  background: #ffffff;
  height: calc((640px - 44px) / 6) !important;
  min-height: calc((640px - 44px) / 6) !important;
  max-height: calc((640px - 44px) / 6) !important;
  overflow: hidden;
}

:deep(.vuecal__cell-content) {
  position: relative;
  height: 100%;
  padding: 4px;
  overflow: hidden;
}

:deep(.vuecal__cell-date) {
  position: absolute;
  top: 4px;
  left: 6px;
  font-size: 13px;
  font-weight: 800;
  color: #111827;
  line-height: 1;
  z-index: 2;
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
  min-height: 0 !important;
  height: auto !important;
  margin-top: 0 !important;
  margin-bottom: 2px !important;
  overflow: hidden;
}

:deep(.vuecal__event:first-of-type) {
  margin-top: 18px !important;
}

:deep(.calendar-event-text) {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: clamp(7px, 1.2vw, 11px);
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

  :deep(.vuecal__weekdays-headings) {
    height: 34px;
    min-height: 34px;
    max-height: 34px;
  }

  :deep(.vuecal__weekday) {
    font-size: 10px;
  }

  :deep(.vuecal__body) {
    height: calc(420px - 34px) !important;
  }

  :deep(.vuecal__cell) {
    height: calc((420px - 34px) / 6) !important;
    min-height: calc((420px - 34px) / 6) !important;
    max-height: calc((420px - 34px) / 6) !important;
  }

  :deep(.vuecal__cell-content) {
    padding: 2px;
  }

  :deep(.vuecal__cell-date) {
    top: 3px;
    left: 4px;
    font-size: 11px;
  }

  :deep(.vuecal__event) {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
  }

  :deep(.vuecal__event:first-of-type) {
    margin-top: 18px !important;
  }

  :deep(.calendar-event-text) {
    font-size: clamp(6px, 1.8vw, 9px);
  }
}

@media (max-width: 480px) {
  :deep(.responsive-calendar) {
    height: 360px;
  }

  :deep(.vuecal__weekdays-headings) {
    height: 30px;
    min-height: 30px;
    max-height: 30px;
  }

  :deep(.vuecal__body) {
    height: calc(360px - 30px) !important;
  }

  :deep(.vuecal__cell) {
    height: calc((360px - 30px) / 6) !important;
    min-height: calc((360px - 30px) / 6) !important;
    max-height: calc((360px - 30px) / 6) !important;
  }

  :deep(.vuecal__cell-content) {
    padding: 1px;
  }

  :deep(.vuecal__cell-date) {
    top: 2px;
    left: 3px;
    font-size: 10px;
  }

  :deep(.vuecal__event) {
    margin-top: 0 !important;
    margin-bottom: 2px !important;
  }

  :deep(.vuecal__event:first-of-type) {
    margin-top: 18px !important;
  }
  :deep(.calendar-event-text) {
    font-size: clamp(5px, 2vw, 8px);
  }
}
</style>
