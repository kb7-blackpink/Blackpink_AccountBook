import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from './user';
import axios from '@/services/api/axios';

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
      totalBalance: (totalIncome - totalExpense).toLocaleString() + '원',
      totalIncome: totalIncome.toLocaleString() + '원',
      totalExpense: totalExpense.toLocaleString() + '원',
      thisMonthExpense,
      lastMonthExpense,
      diff,
    };
  });

  const dynamicMessage = computed(() => {
    if (message.value.length === 0) return '데이터를 불러오는 중이에요...ㅎㅎ';

    let condition = 'same';
    if (summary.value.diff > 0) condition = 'more';
    else if (summary.value.diff < 0) condition = 'less';

    const msgObj = message.value.find(
      (m) => m.condition === condition && m.mode === userStore.mode,
    );

    return msgObj ? msgObj.text : '메시지를 불러오지 못했어요.';
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
    if (!userStore.user) {
      userStore.loadUserFromStorage();
    }

    const userId = userStore.user?.id;

    if (!userId) {
      transaction.value = [];
      message.value = [];
      return;
    }

    const [transRes, msgRes] = await Promise.all([
      axios.get('/budget', { params: { userId } }),
      axios.get('/messages'),
    ]);

    transaction.value = transRes.data;
    message.value = msgRes.data;
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
