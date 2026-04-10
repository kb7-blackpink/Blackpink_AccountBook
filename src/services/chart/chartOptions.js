export const getChartOptions = (mode) => {
  const isLucky = mode === 'lucky';
  const textColor = isLucky ? '#1f2937' : '#ffffff';
  const gridColor = isLucky ? '#f3f4f6' : 'rgba(255, 255, 255, 0.1)';

  const common = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: isLucky
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(0, 0, 0, 0.8)',
        titleColor: isLucky ? '#1f2937' : '#ffffff',
        bodyColor: isLucky ? '#1f2937' : '#ffffff',
      },
    },
  };

  return {
    DONUT: {
      ...common,
      cutout: '70%',
      plugins: {
        ...common.plugins,
        legend: {
          display: true, // 범례 표시
          position: 'bottom',
          labels: {
            padding: 20,
            color: textColor,
            font: { size: 12 },
          },
        },
      },
    },
    BAR: {
      ...common,
      plugins: {
        ...common.plugins,
        legend: {
          display: false, // ★ 막대 그래프만 범례(라벨/아이콘) 숨김
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: textColor, // ★ X축 (일, 월, 화...) 글씨 색상
            font: { size: 12 },
            maxRotation: 0, // 기울어짐 방지
            autoSkip: true, // 겹치면 건너뛰기
            maxTicksLimit: 15, // 최대 15개까지 노출
          },
        },
        y: {
          beginAtZero: true,
          grid: { color: gridColor },
          ticks: {
            color: textColor, // ★ Y축 (0, 5,000, 10,000...) 글씨 색상
            font: { size: 12 },
            maxRotation: 0, // 기울어짐 방지
            autoSkip: true, // 겹치면 건너뛰기
            maxTicksLimit: 7, // 최대 7개까지 노출
            callback: (value) => value.toLocaleString() + '원',
          },
        },
      },
    },
  };
};
