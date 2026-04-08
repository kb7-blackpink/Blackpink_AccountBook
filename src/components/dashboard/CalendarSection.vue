<template>
  <section
    :class="[
      'rounded-[20px] border bg-white p-3 shadow-sm transition-colors sm:rounded-[24px] sm:p-5',
      isUnlucky ? 'border-violet-200' : 'border-gray-200',
    ]"
  >
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h2 class="text-lg font-extrabold text-gray-900">달력</h2>
        <p
          :class="[
            'mt-1 text-sm',
            isUnlucky ? 'text-violet-400' : 'text-gray-500',
          ]"
        >
          날짜별 수입 / 지출 합계
        </p>
      </div>

      <button
        type="button"
        :class="[
          'inline-flex items-center rounded-xl border bg-white px-3 py-2 text-sm font-semibold transition',
          isUnlucky
            ? 'border-violet-200 text-violet-700 hover:bg-violet-50'
            : 'border-gray-200 text-gray-700 hover:bg-gray-50',
        ]"
      >
        필터
      </button>
    </div>

    <div
      :class="[
        'calendar-shell overflow-hidden rounded-[20px] border bg-white',
        isUnlucky ? 'border-violet-100' : 'border-gray-100',
      ]"
    >
      <VueCal
        locale="ko"
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

    <div
      :class="[
        'mt-4 rounded-[18px] border px-3 py-3 sm:mt-5 sm:rounded-[20px] sm:px-4 sm:py-4',
        isUnlucky
          ? 'border-violet-100 bg-violet-50/50'
          : 'border-gray-100 bg-gray-50',
      ]"
    >
      <div
        class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <h3 class="text-sm font-extrabold text-gray-900">
          {{ selectedDateLabel }}
        </h3>

        <div class="flex items-center gap-3 text-xs font-bold">
          <span :class="isUnlucky ? 'text-violet-600' : 'text-emerald-600'">
            +{{ formatMoney(selectedSummary.income) }}원
          </span>
          <span :class="isUnlucky ? 'text-fuchsia-500' : 'text-rose-500'">
            -{{ formatMoney(selectedSummary.expense) }}원
          </span>
        </div>
      </div>

      <ul v-if="selectedTransactions.length > 0" class="space-y-3">
        <li
          v-for="item in selectedTransactions"
          :key="item.id"
          class="flex items-center justify-between rounded-2xl bg-white px-3 py-2.5 sm:px-4 sm:py-3"
        >
          <div class="min-w-0">
            <p class="truncate text-sm font-bold text-gray-900">
              {{ item.title }}
            </p>
            <p class="mt-1 text-xs text-gray-400">
              {{ item.category }}
            </p>
          </div>

          <span
            class="shrink-0 text-xs font-extrabold sm:text-sm"
            :class="
              item.type === 'income'
                ? isUnlucky
                  ? 'text-violet-600'
                  : 'text-emerald-600'
                : isUnlucky
                  ? 'text-fuchsia-500'
                  : 'text-rose-500'
            "
          >
            {{ item.type === 'income' ? '+' : '-'
            }}{{ formatMoney(item.amount) }}원
          </span>
        </li>
      </ul>

      <div
        v-else
        class="rounded-2xl bg-white px-4 py-6 text-center text-sm font-semibold text-gray-400"
      >
        선택한 날짜의 내역이 없어요.
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const props = defineProps({
  mode: {
    type: String,
    default: 'lucky',
  },
});

const isUnlucky = computed(() => props.mode === 'unlucky');

const transactions = ref([
  {
    id: '1',
    userId: 'u-1',
    date: '2026-04-07',
    type: 'expense',
    title: '돈까스',
    category: '식비',
    amount: 12000,
    memo: '회사 앞 돈까스',
    reflection: '',
  },
  {
    id: '2',
    userId: 'u-1',
    date: '2026-04-08',
    type: 'expense',
    title: '티셔츠',
    category: '쇼핑',
    amount: 45000,
    memo: '지나치다 산 티셔츠',
    reflection:
      '집에 검은 티셔츠만 5개인데 또 샀네요. 다음부턴 옷장 열어보고 나오겠습니다.',
  },
  {
    id: '3',
    userId: 'u-1',
    date: '2026-04-10',
    type: 'income',
    title: '4월 월급',
    category: '월급',
    amount: 2500000,
    memo: '회사 급여 입금',
    reflection: '',
  },
  {
    id: '4',
    userId: 'u-1',
    date: '2026-04-11',
    type: 'income',
    title: '엄마 용돈',
    category: '용돈',
    amount: 100000,
    memo: '엄마가 보내주심',
    reflection: '',
  },
]);

const selectedDate = ref('2026-04-07');

const summaryMap = computed(() => {
  return transactions.value.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = { income: 0, expense: 0 };
    }

    if (item.type === 'income') {
      acc[item.date].income += item.amount;
    } else {
      acc[item.date].expense += item.amount;
    }

    return acc;
  }, {});
});

const calendarEvents = computed(() => {
  const events = [];

  Object.entries(summaryMap.value).forEach(([date, summary]) => {
    if (summary.income > 0) {
      events.push({
        start: `${date} 00:00`,
        end: `${date} 00:20`,
        title: `+${formatMoney(summary.income)}원`,
        class: 'income-event',
      });
    }

    if (summary.expense > 0) {
      events.push({
        start: `${date} 00:30`,
        end: `${date} 00:50`,
        title: `-${formatMoney(summary.expense)}원`,
        class: 'expense-event',
      });
    }
  });

  return events;
});

const selectedTransactions = computed(() =>
  transactions.value.filter((item) => item.date === selectedDate.value),
);

const selectedSummary = computed(
  () => summaryMap.value[selectedDate.value] || { income: 0, expense: 0 },
);

const selectedDateLabel = computed(() => {
  if (!selectedDate.value) return '날짜를 선택해주세요';

  const date = new Date(selectedDate.value);

  if (Number.isNaN(date.getTime())) return '날짜를 선택해주세요';

  return `${date.getMonth() + 1}월 ${date.getDate()}일 내역`;
});

const formatMoney = (value) => Number(value).toLocaleString('ko-KR');

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
    selectedDate.value = formatted;
  }
};

const getEventClass = (eventClass) => {
  if (eventClass === 'income-event') {
    return isUnlucky.value
      ? 'bg-violet-100 text-violet-700'
      : 'bg-emerald-50 text-emerald-600';
  }

  return isUnlucky.value
    ? 'bg-fuchsia-100 text-fuchsia-600'
    : 'bg-rose-50 text-rose-500';
};
</script>

<style scoped>
:deep(.lucky-calendar) {
  --vuecal-primary-color: #84cc16;
}

:deep(.unlucky-calendar) {
  --vuecal-primary-color: #8b5cf6;
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
