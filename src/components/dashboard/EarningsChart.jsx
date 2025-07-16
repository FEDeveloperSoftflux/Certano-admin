import { Line } from 'react-chartjs-2';
import Card from '../common/Card';
import { useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const timeRanges = ['1 Month', '3 Months', '6 Months', '1 Year'];

const EarningsChart = () => {
  const { isMobile } = useResponsive();
  const [selectedRange, setSelectedRange] = useState('1 Month');
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Earnings',
        data: [30000, 28000, 33000, 36000, 34000, 45000],
        borderColor: '#CBA7FF',
        backgroundColor: 'rgba(203, 167, 255, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#CBA7FF',
        pointBorderColor: '#FFC7AA',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1E1E1E',
        titleColor: '#FFFFFF',
        bodyColor: '#A0A0A0',
        borderColor: '#CBA7FF',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#A0A0A0',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#A0A0A0',
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        },
        min: 0,
      },
    },
  };

  return (
    <Card className="w-full h-80">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-3">
        <h3 className="font-schibsted text-base md:text-lg text-white">Earnings Overview</h3>
        <div className="flex bg-cards-alt-bg rounded-lg overflow-hidden">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-2 md:px-3 py-1 text-xs md:text-sm transition-all whitespace-nowrap ${
                selectedRange === range ? 'bg-white/10 text-white' : 'text-text-body'
              }`}
            >
              {isMobile ? range.split(' ')[0] : range}
            </button>
          ))}
        </div>
      </div>
      <div className="h-48 md:h-56">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};

export default EarningsChart;
