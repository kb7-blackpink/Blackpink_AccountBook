// 모든 차트에 공통으로 적용될 기본 옵션

const COMMON_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom', 
      labels: {
        padding: 20,
        font: {
          family: 'Pretendard, sans-serif',
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#1f2937', // gray-800
      bodyColor: '#1f2937',
      borderColor: '#e5e7eb', // gray-200
      borderWidth: 1,
      padding: 10,
      cornerRadius: 8,
      displayColors: true,
    },
  },
};

export const CHART_OPTIONS = {
  // 도넛 - 카테고리별 지출
  DONUT: {
    ...COMMON_OPTIONS,
    cutout: '70%', 
    plugins: {
      ...COMMON_OPTIONS.plugins,
      legend: {
        ...COMMON_OPTIONS.plugins.legend,
        display: true, 
      },
    },
  },

  // 막대 - 기간별 지출
  BAR: {
    ...COMMON_OPTIONS,
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          callback: function(value) {
            return value.toLocaleString() + '원';
          },
        },
      },
    },
  },
};