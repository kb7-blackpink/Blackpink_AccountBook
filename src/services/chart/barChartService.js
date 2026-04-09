// 모드별 색상 팔레트
const PALETTES = {
  lucky: ['#C0E068', '#90B13B', '#628402', '#365A00', '#193200'],
  unlucky: ['#e2c7ff', '#b399cf', '#866ea1', '#5b4575', '#33204c'],
};

export const getBarChartData = (transactions, mode) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dailySums = Array(7).fill(0);

  expenses.forEach((t) => {
    const dayIndex = new Date(t.date).getDay(); // 0(일)~6(토)
    dailySums[dayIndex] += t.amount;
  });

  return {
    labels: dayNames,
    datasets: [
      {
        label: '요일별 지출',
        data: dailySums,
        // 모드에 따른 색상변경
        backgroundColor: PALETTES[mode] || PALETTES.lucky,
        borderRadius: 10,
        barThickness: 20,
      },
    ],
  };
};
