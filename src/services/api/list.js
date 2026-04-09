import axios from '@/services/api/axios';

// 유저의 거래 내역 + 카테고리 아이콘 맵을 한 번에 가져옴.
export async function fetchTransactionData(userId) {
  const [budgetRes, incomeRes, expenseRes] = await Promise.all([
    axios.get('/budget', { params: { userId } }),
    axios.get('/incomeCategory'),
    axios.get('/expenseCategory'),
  ]);

  const categoryIconMap = {};
  [...incomeRes.data, ...expenseRes.data].forEach(({ name, icon }) => {
    categoryIconMap[name] = icon;
  });

  return {
    transactions: budgetRes.data,
    categoryIconMap,
  };
}
