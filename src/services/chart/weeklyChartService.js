
export const getWeeklyChartData = (transactions) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dailySums = Array(7).fill(0);

  expenses.forEach(t => {
    const dayIndex = new Date(t.date).getDay(); // 0(일)~6(토)
    dailySums[dayIndex] += t.amount;
  });

  return {
    labels: dayNames,
    datasets: [{
      label: '요일별 지출',
      data: dailySums,
      backgroundColor: '#548c00',
      borderRadius: 10,
      barThickness: 20
    }]
  };
};