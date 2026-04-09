export const getChartOptions = (mode) => {
  const isLucky = mode === 'lucky';
  
  const textColor = isLucky ? '#1f2937' : '#ffffff'; 
  const gridColor = isLucky ? '#f3f4f6' : 'rgba(255, 255, 255, 0.1)';

  const common = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          color: textColor, // ★ 범례 (식비, 쇼핑, 요일별 지출) 색상
          font: { family: 'Pretendard, sans-serif', size: 12 },
        },
      },
      tooltip: {
        backgroundColor: isLucky ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
        titleColor: isLucky ? '#1f2937' : '#ffffff',
        bodyColor: isLucky ? '#1f2937' : '#ffffff',
      },
    },
  };

  return {
    DONUT: {
      ...common,
      cutout: '70%',
    },
    BAR: {
      ...common,
      scales: {
        x: {
          grid: { display: false },
          ticks: { 
            color: textColor, // ★ X축 (일, 월, 화...) 글씨 색상
            font: { size: 12 }
          },
        },
        y: {
          beginAtZero: true,
          grid: { color: gridColor },
          ticks: {
            color: textColor, // ★ Y축 (0, 5,000, 10,000...) 글씨 색상
            font: { size: 12 },
            callback: (value) => value.toLocaleString() + '원',
          },
        },
      },
    },
  };
};