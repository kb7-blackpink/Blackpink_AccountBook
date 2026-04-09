import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
} from 'chart.js';

// 필요한 요소들을 전역으로 등록
ChartJS.register(
  Title, Tooltip, Legend, 
  ArcElement, CategoryScale, 
  LinearScale, BarElement, 
  PointElement, LineElement
);