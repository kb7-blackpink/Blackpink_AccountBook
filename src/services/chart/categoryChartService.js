
// 모드별 색상 팔레트
const PALETTES = {
  lucky: ['#C0E068', '#90B13B', '#628402', '#365A00', '#193200'],
  unlucky: ['#e2c7ff', '#b399cf', '#866ea1', '#5b4575', '#33204c'],
}

export const getCategoryChartData = (transactions, mode) => {
  // 1. 지출 내역만 필터링
  const expenses = transactions.filter(t => t.type === 'expense');

  // 2. 카테고리별 합계 계산
  const categoryTotals = expenses.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
    return acc;
  }, {});

  return {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      // 모드에 따른 색상변경
      backgroundColor: PALETTES[mode] || PALETTES.lucky,
      borderWidth: 0,
      hoverOffset: 10
    }]
  };
};