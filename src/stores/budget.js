import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useBudgetStore = defineStore('budget', () => {
  const transaction = ref([]);

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

  async function fetchTransaction() {
    const res = await fetch('http://localhost:3000/budget');
    transaction.value = await res.json();
  }

  console.log(transaction.value);

  return {
    transaction,
    summary,
    fetchTransaction,
  };
});
