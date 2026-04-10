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

// 거래 내역 추가 모달 부분
export async function createTransaction(data) {
  const res = await axios.post('/budget', data);
  return res.data;
}

// 거래 내역 삭제 모달 부분
export async function deleteTransaction(id) {
  await axios.delete(`/budget/${id}`);
}

export async function updateTransaction(id, data) {
  const res = await axios.put(`/budget/${id}`, data);
  return res.data;
}
