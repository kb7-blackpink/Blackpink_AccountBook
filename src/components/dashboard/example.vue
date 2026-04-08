<template>
  <section
    :class="[
      'rounded-[24px] border bg-white p-5 shadow-sm transition-colors',
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
        'overflow-hidden rounded-[20px] border bg-white',
        isUnlucky ? 'border-violet-100' : 'border-gray-100',
      ]"
    >
      <VueCal
        locale="ko"
        :class="isUnlucky ? 'unlucky-calendar' : 'lucky-calendar'"
        active-view="month"
        :disable-views="['years', 'year', 'week', 'day']"
        :time="false"
        hide-view-selector
        :events-on-month-view="true"
        :events="calendarEvents"
        @cell-click="handleCellClick"
        style="height: 640px"
      >
        <template #event="{ event }">
          <div
            class="w-full truncate rounded-lg px-2 py-1 text-[11px] font-extrabold leading-none"
            :class="getEventClass(event.class)"
          >
            {{ event.title }}
          </div>
        </template>
      </VueCal>
    </div>

    <div
      :class="[
        'mt-5 rounded-[20px] border px-4 py-4',
        isUnlucky
          ? 'border-violet-100 bg-violet-50/50'
          : 'border-gray-100 bg-gray-50',
      ]"
    >
      <div class="mb-3 flex items-center justify-between">
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
          class="flex items-center justify-between rounded-2xl bg-white px-4 py-3"
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
            class="shrink-0 text-sm font-extrabold"
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
    id: 1,
    date: '2026-04-02',
    type: 'income',
    amount: 50000,
    category: '용돈',
    title: '엄마 용돈',
  },
  {
    id: 2,
    date: '2026-04-02',
    type: 'expense',
    amount: 12000,
    category: '식비',
    title: '점심',
  },
  {
    id: 3,
    date: '2026-04-02',
    type: 'expense',
    amount: 4500,
    category: '카페',
    title: '아이스 아메리카노',
  },
  {
    id: 4,
    date: '2026-04-05',
    type: 'income',
    amount: 150000,
    category: '알바',
    title: '주말 알바비',
  },
  {
    id: 5,
    date: '2026-04-06',
    type: 'expense',
    amount: 8000,
    category: '교통',
    title: '버스/지하철',
  },
  {
    id: 6,
    date: '2026-04-06',
    type: 'expense',
    amount: 13500,
    category: '식비',
    title: '저녁',
  },
  {
    id: 7,
    date: '2026-04-08',
    type: 'income',
    amount: 30000,
    category: '정산',
    title: '친구 정산',
  },
  {
    id: 8,
    date: '2026-04-08',
    type: 'expense',
    amount: 21000,
    category: '생활',
    title: '생필품',
  },
  {
    id: 9,
    date: '2026-04-10',
    type: 'expense',
    amount: 70000,
    category: '문화',
    title: '공연 티켓',
  },
]);

const selectedDate = ref('2026-04-02');

const summaryMap = computed(() => {
  return transactions.value.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = { income: 0, expense: 0 };

    if (item.type === 'income') acc[item.date].income += item.amount;
    else acc[item.date].expense += item.amount;

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
  console.log('cell : ', cell);

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
</style>
