import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart({ reports }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê báo cáo theo loại',
      },
    },
  };

  // Mẫu dữ liệu mặc định nếu chưa có dữ liệu thực
  const defaultData = {
    labels: ['Spam', 'Nội dung không phù hợp', 'Lừa đảo', 'Khác'],
    datasets: [
      {
        label: 'Số báo cáo',
        data: [4, 7, 3, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Xử lý dữ liệu thực nếu có
  const data = reports && reports.length > 0 ? {
    labels: reports.map(report => report.reason),
    datasets: [
      {
        label: 'Số báo cáo',
        data: reports.map(report => report.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  } : defaultData;

  return <Bar options={options} data={data} />;
} 