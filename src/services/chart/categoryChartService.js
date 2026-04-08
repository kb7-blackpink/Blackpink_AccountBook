// stores/statistics.js 데이터를 Chart.js 형식으로 변환

export const getCategoryChartData = (transactions) => {
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
      backgroundColor: ['#548c00', '#8bc34a', '#a855f7', '#201a61', '#e5e7eb'], // 럭키/언럭키 테마 색상
      borderWidth: 0,
      hoverOffset: 10
    }]
  };
};