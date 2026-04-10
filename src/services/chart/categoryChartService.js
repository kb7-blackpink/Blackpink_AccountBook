// 모드별 색상 팔레트
const PALETTES = {
  lucky: ['#C0E068', '#90B13B', '#628402', '#365A00'],
  unlucky: ['#e2c7ff', '#b399cf', '#866ea1', '#5b4575'],
};

export const getCategoryChartData = (transactions, mode) => {
  // 1. 지출 내역이면서 카테고리가 존재하는 것만 필터링
  const expenses = transactions.filter(
    (t) => t.type === 'expense' && t.category,
  );

  // 2. 카테고리별 합계 계산
  const categoryTotals = expenses.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
    return acc;
  }, {});

  const entries = Object.entries(categoryTotals);

  return {
    labels: entries.map(([name]) => name),
    datasets: [
      {
        data: entries.map(([, value]) => value),
        backgroundColor: PALETTES[mode] || PALETTES.lucky,
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };
};
