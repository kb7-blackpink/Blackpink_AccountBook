// 모드별 색상 팔레트
const PALETTES = {
  lucky: ['#C0E068', '#90B13B', '#628402', '#365A00', '#193200'],
  unlucky: ['#e2c7ff', '#b399cf', '#866ea1', '#5b4575', '#33204c'],
};

export const getBarChartData = (transactions, mode, view, currentYear, currentMonth) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  let labels = [];
  let data = [];

  if (view === '일별') {
    // 해당 월의 마지막 날짜 구하기 (예: 30일, 31일)
    const lastDay = new Date(currentYear, currentMonth, 0).getDate();
    labels = Array.from({ length: lastDay }, (_, i) => `${i + 1}일`);
    data = Array(lastDay).fill(0);

    expenses.forEach((t) => {
      const tDate = new Date(t.date);
      if (tDate.getMonth() + 1 === currentMonth) {
        data[tDate.getDate() - 1] += t.amount;
      }
    });
  } 
  
  else if (view === '주별') {
    labels = ['1주차', '2주차', '3주차', '4주차', '5주차'];
    data = Array(5).fill(0);

    expenses.forEach((t) => {
      const tDate = new Date(t.date);
      // 단순 계산: 7일 단위로 주차 구분
      const weekIndex = Math.floor((tDate.getDate() - 1) / 7);
      if (weekIndex < 5) data[weekIndex] += t.amount;
    });
  } 
  
  else if (view === '월별') {
    labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    data = Array(12).fill(0);

    // 월별은 현재 선택된 달이 아닌, 전체 내역에서 해당 연도의 월별 합계를 구함
    expenses.forEach((t) => {
      const tDate = new Date(t.date);
      if (tDate.getFullYear() === currentYear) {
        data[tDate.getMonth()] += t.amount;
      }
    });
  }

  return {
    labels,
    datasets: [
      {
        label: `${view} 지출액`,
        data: data,
        backgroundColor: mode === 'lucky' ? PALETTES.lucky[0] : PALETTES.unlucky[0],
        borderRadius: 8,
        barThickness: view === '일별' ? 10 : 30, // 일별은 막대가 많으므로 얇게
      },
    ],
  };
};