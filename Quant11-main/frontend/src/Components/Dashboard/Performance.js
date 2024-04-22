import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
      //   text: 'Chart.js Line Chart'
    }
  },
  scales: {
    x: {
      display: false // Hide x axis
    },
    y: {
      display: false // Hide y axis
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const dataPoints = [65, 59, 80, 81, 56, 55, 140];

const Performance = ({ chartData }) => {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: chartData,
        borderColor: 'rgb(67, 160, 71)',
        backgroundColor: 'rgba(67, 160, 71, 0.1)',
        pointRadius: 0
      }
    ]
  };

  return <Line options={options} data={data} className="performnce-chart" />;
};

export default Performance;
