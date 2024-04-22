import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top'
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart'
//     },
//     scales: {
//       x: {
//         display: true,
//         title: {
//           display: true,
//           text: 'Date'
//         }
//       },
//       y: {
//         display: true,
//         title: {
//           display: true,
//           text: 'Amount'
//         },
//         ticks: {
//           min: 0,
//           max: 1000,
//           stepSize: 100,
//           values: [0, 100, 200, 300, 400]
//         }
//       }
//     }
//   }
// };

const PnlGraph = ({ historicalChartData, closeTradeChartData, strategyData }) => {
  // console.log('historicalChartData ', historicalChartData);

  // const closeTradeData = closeTradeChartData?.map((dataPoint) => dataPoint.amount.toFixed(2));
  // const historicalData = historicalChartData?.map((dataPoint) => dataPoint.amount.toFixed(2));

  // console.log('closeTradeData ', closeTradeData);
  // console.log('historicalData ', historicalData);

  //Chart show in percentages
  const closeTradeData = closeTradeChartData?.map((dataPoint) => parseFloat(dataPoint.percentage));
  const historicalData = historicalChartData?.map((dataPoint) => parseFloat(dataPoint.amount));

  // Calculate total sums for both datasets
  const totalCloseTrade = closeTradeData?.reduce((acc, val) => acc + val, 0);
  const totalHistorical = historicalData?.reduce((acc, val) => acc + val, 0);

  // Convert data to percentages
  const closeTradePercentage = closeTradeData?.map((value) =>
    (value / totalCloseTrade)?.toFixed(2)
  );
  const historicalPercentage = historicalData?.map((value) =>
    (value / totalHistorical)?.toFixed(2)
  );

  const amounts = closeTradeData && historicalData ? [...closeTradeData, ...historicalData] : [];

  const formattedAmounts =
    amounts.length > 0 ? amounts?.map((amount) => Number(amount).toFixed(2)) : [];
  const date =
    amounts.length > 0
      ? historicalChartData?.map((dataPoint) => dataPoint.date)
      : closeTradeChartData?.map((dataPoint) => dataPoint.date);

  // console.log('date ', date);
  // const labels = date;

  // Calculate the step size for distributing the dates into 10 entries
  // const step = Math.ceil(date.length / 10); // We subtract 2 because we're already including the first and last dates

  // Initialize an array to store the labels
  const labels = [];

  // Extract dates at intervals of the step size
  for (let i = 0; i < date.length; i += 2) {
    labels.push(date[i]);
  }

  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: `${strategyData.strategy_name}`,
        data: closeTradePercentage,
        borderColor: 'rgb(67, 160, 71)',
        backgroundColor: 'rgb(67, 160, 71)'
        // pointRadius: 0
      },
      {
        fill: false,
        label: `${strategyData.ticker_symbol}`,
        data: historicalPercentage,
        borderColor: 'rgb(187, 134, 252)',
        backgroundColor: 'rgb(187, 134, 252)'
        // pointRadius: 0
      }
    ]
  };

  // Find the minimum and maximum amounts
  const minAmount = Math.min(...formattedAmounts);
  const maxAmount = Math.max(...formattedAmounts);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart'
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Amount'
          },
          ticks: {
            min: minAmount,
            max: maxAmount
          }
        }
      }
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Line options={options} data={data} className="pnl-curve-container" />
    </div>
  );
};

export default PnlGraph;
