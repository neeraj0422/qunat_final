import React, { useEffect, useState } from 'react';
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
import apiRequest from '../../api/api';
import moment from 'moment';

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

const StrategyGraph = ({ strategy }) => {
  const [chartdata, setChartdata] = useState([]);
  const fetchCloseTradeData = async () => {
    try {
      const { responseData } = await apiRequest('api/v1/trades/close/all', 'POST', {
        strategy_id: strategy._id
      });
      const data = responseData.data;

      // setTradeDate({ startDate: formattedMinDate, endDate: formattedMaxDate });
      const closeTradePnL = data?.map((item) => {
        return {
          date: item.close_time,
          amount: item.profit_loss
        };
      });

      const sumByDate = closeTradePnL.reduce((acc, trade) => {
        const currentDate = moment(trade.date).format('YYYY-MM-DD');

        // If the currentDate already exists in the accumulator, add the profit/loss to its sum
        if (acc[currentDate]) {
          acc[currentDate] += trade.amount;
        } else {
          // Otherwise, initialize the sum for the currentDate
          acc[currentDate] = trade.amount;
        }

        return acc;
      }, {});
      const aggregatedData = Object.entries(sumByDate)?.map(([date, sum]) => ({
        date,
        amount: sum
      }));
      setChartdata(aggregatedData.reverse());
    } catch (error) {
      console.log('Error occured while fetching close trade data');
    }
  };

  useEffect(() => {
    fetchCloseTradeData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
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
  //   const dataPoints = [65, 59, 80, 81, 56, 55, 140];
  const dataPoints = chartdata?.map((data) => data.amount?.toFixed(2));
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: dataPoints,
        borderColor: 'rgb(67, 160, 71)',
        backgroundColor: 'rgba(67, 160, 71, 0.1)',
        pointRadius: 0
      }
    ]
  };
  return <Line options={options} data={data} className="strategy-performence-graph" />;
};

export default StrategyGraph;
