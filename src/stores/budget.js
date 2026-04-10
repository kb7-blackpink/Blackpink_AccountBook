import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from './user';

export const useBudgetStore = defineStore('budget', () => {
  const transaction = ref([]);
  const message = ref([]);
  const userStore = useUserStore();

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const selectedDate = ref(getTodayString());
  const currentCalendarDate = ref(`${getTodayString().slice(0, 7)}-01`);

  const summary = computed(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const totalIncome = transaction.value
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transaction.value
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // 이번 달 지출 계산
    const thisMonthExpense = transaction.value
      .filter((t) => {
        const d = new Date(t.date);
        return (
          t.type === 'expense' &&
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpense = transaction.value
      .filter((t) => {
        const d = new Date(t.date);
        const lastM = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastY = currentMonth === 0 ? currentYear - 1 : currentYear;
        return (
          t.type === 'expense' &&
          d.getMonth() === lastM &&
          d.getFullYear() === lastY
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const diff = thisMonthExpense - lastMonthExpense;

    return {
      totalBalance: (totalIncome - totalExpense).toLocaleString() + '원', // 총 잔액
      totalIncome: totalIncome.toLocaleString() + '원',
      totalExpense: totalExpense.toLocaleString() + '원',
      thisMonthExpense,
      lastMonthExpense,
      diff,
    };
  });

  const dynamicMessage = computed(() => {
    if (message.value.length === 0) return '데이터를 불러오는 중이에요...ㅎㅎ';

    // 지출 상태 판별
    let condition = 'same';
    if (summary.value.diff > 0) condition = 'more';
    else if (summary.value.diff < 0) condition = 'less';

    // 조건과 모드에 맞는 메시지 찾기
    const msgObj = message.value.find(
      (m) => m.condition === condition && m.mode === userStore.mode,
    );

    return msgObj ? msgObj.text : '블랙핑인율어에리아';
  });

  const summaryMap = computed(() => {
    return transaction.value.reduce((acc, item) => {
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
          title: `+${summary.income.toLocaleString()}원`,
          class: 'income-event',
        });
      }

      if (summary.expense > 0) {
        events.push({
          start: `${date} 00:30`,
          end: `${date} 00:50`,
          title: `-${summary.expense.toLocaleString()}원`,
          class: 'expense-event',
        });
      }
    });

    return events;
  });
  const normalizeDate = (value) => {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const selectedTransaction = computed(() => {
    const targetDate = normalizeDate(selectedDate.value);

    return transaction.value.filter(
      (item) => normalizeDate(item.date) === targetDate,
    );
  });

  const selectedSummary = computed(() => {
    const targetDate = normalizeDate(selectedDate.value);

    return transaction.value.reduce(
      (acc, item) => {
        if (normalizeDate(item.date) !== targetDate) return acc;

        if (item.type === 'income') acc.income += item.amount;
        else acc.expense += item.amount;

        return acc;
      },
      { income: 0, expense: 0 },
    );
  });

  const calendarTitle = computed(() => {
    const date = new Date(currentCalendarDate.value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}년 ${month}월`;
  });

  function setSelectedDate(date) {
    selectedDate.value = date;
  }

  function setCurrentCalendarDate(date) {
    currentCalendarDate.value = date;
  }

  function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function goPrevMonth() {
    const date = new Date(currentCalendarDate.value);
    const moved = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const formatted = formatLocalDate(moved);
    currentCalendarDate.value = formatted;
    selectedDate.value = formatted;
  }

  function goNextMonth() {
    const date = new Date(currentCalendarDate.value);
    const moved = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const formatted = formatLocalDate(moved);
    currentCalendarDate.value = formatted;
    selectedDate.value = formatted;
  }
  async function fetchAllData() {
    const [transRes, msgRes] = await Promise.all([
      fetch(
        'https://blackpinkaccountbookjson-server-production.up.railway.app/budget',
      ),
      fetch(
        'https://blackpinkaccountbookjson-server-production.up.railway.app/messages',
      ),
    ]);

    transaction.value = await transRes.json();
    message.value = await msgRes.json();
  }

  return {
    transaction,
    message,
    selectedDate,
    currentCalendarDate,
    summary,
    dynamicMessage,
    summaryMap,
    calendarEvents,
    selectedTransaction,
    selectedSummary,
    calendarTitle,
    setSelectedDate,
    setCurrentCalendarDate,
    goPrevMonth,
    goNextMonth,
    fetchAllData,
  };
});
