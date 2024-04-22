import { StyledTradeHistoryPnlCurve } from '../../Styles/Pages/TradeHistory';
// import PnlCurveChart from '../../Assets/Dashboard/PnlCurve.png';
import { useEffect, useState } from 'react';
import apiRequest from '../../api/api';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import PnlGraph from './PnlGraph';

const PnlCurve = () => {
  const { stockDetailId } = useParams();
  const [historicalChartData, setHistoricalChartData] = useState([]);
  const [closeTradeChartData, setCloseTradeChartData] = useState([]);
  const [strategyData, setStrategyData] = useState([]);
  // const [tradeDate, setTradeDate] = useState({
  //   startDate: '',
  //   endDate: ''
  // });

  // Get current date
  const currentDate = moment();
  const endDate = currentDate.subtract(1, 'days').format('YYYY-MM-DD');
  const startDate = currentDate.subtract(30, 'days').format('YYYY-MM-DD');

  const fetchStrategyDetail = async () => {
    try {
      const { responseData } = await apiRequest('api/v1/strategies/details', 'POST', {
        id: stockDetailId
      });

      fetchHistoricalTradeData(responseData.data);
      fetchCloseTradeData(responseData.data);
      setStrategyData(responseData.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const fetchCloseTradeData = async (strategyData) => {
    try {
      const { responseData } = await apiRequest('api/v1/trades/close/all', 'POST', {
        strategy_id: stockDetailId
      });
      const data = responseData?.data;
      // console.log('data', data);
      // const closeTradedate = data?.map((dataPoint) => dataPoint.close_time);
      // Convert dates to JavaScript Date objects
      // const dateObjects = closeTradedate?.map((dateString) => new Date(dateString));

      // Find minimum and maximum dates
      // const minDate = new Date(Math.min(...dateObjects));
      // const maxDate = new Date(Math.max(...dateObjects));

      // Format dates using Moment.js
      // const formattedMinDate = moment(minDate).format('YYYY-MM-DD');
      // const formattedMaxDate = moment(maxDate).format('YYYY-MM-DD');
      // setTradeDate({ startDate: formattedMinDate, endDate: formattedMaxDate });

      const filteredTrades = data.filter((trade) => {
        const closeDate = new Date(trade.close_time);
        return closeDate >= new Date(startDate) && closeDate <= new Date(endDate);
      });

      // const closeTradePnL = data?.map((item) => {
      const closeTradePnL = filteredTrades?.map((item) => {
        return {
          date: item.close_time,
          amount: item.profit_loss,
          open: item.open_price,
          close: item.close_price
        };
      });

      const sumByDate = closeTradePnL.reduce((acc, trade) => {
        const currentDate = moment(trade.date).format('YYYY-MM-DD');

        const diff = trade.close - trade.open;
        // console.log('diff', diff);
        const resultInPercentage = (diff * 100) / trade.open;
        // console.log('resultInPercentage', resultInPercentage);
        // If the currentDate already exists in the accumulator, add the profit/loss to its sum
        if (acc[currentDate]) {
          acc[currentDate] += resultInPercentage;
        } else {
          // Otherwise, initialize the sum for the currentDate
          acc[currentDate] = resultInPercentage;
        }

        return acc;
      }, {});
      const aggregatedData = Object.entries(sumByDate)?.map(([date, sum]) => ({
        date,
        percentage: sum
      }));
      // fetchHistoricalTradeData(strategyData, formattedMinDate, formattedMaxDate);
      fetchHistoricalTradeData(strategyData);
      setCloseTradeChartData(aggregatedData?.reverse());
    } catch (error) {
      console.log('Error occured while fetching close trade data');
    }
  };

  const fetchHistoricalTradeData = async (strategyDetail) => {
    // if (formattedMaxDate && formattedMinDate) {
    if (startDate && endDate) {
      const { responseData } = await apiRequest('api/v1/yahoo-finance/historical-data', 'POST', {
        ticker_symbol: strategyDetail?.ticker_symbol,
        // start_date: formattedMinDate,
        start_date: startDate,
        end_date: endDate
        // end_date: formattedMaxDate
      });

      const data = await responseData?.data?.map((item) => {
        return { date: moment(item.date).format('YYYY-MM-DD'), amount: item.close };
      });

      setHistoricalChartData(data);
      // console.log('fetchHistoricalTradeData', data);
    } else {
      console.log('Date is not provided ');
    }
  };

  useEffect(() => {
    fetchStrategyDetail();
  }, []);
  // console.log('startDate', startDate);
  // console.log('endDate', endDate);
  return (
    <>
      <StyledTradeHistoryPnlCurve>
        <div className="section-title">Pnl Curve</div>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {/* <img src={PnlCurveChart} alt="chart" /> */}
          <PnlGraph
            historicalChartData={historicalChartData}
            closeTradeChartData={closeTradeChartData}
            strategyData={strategyData}
          />
        </div>
      </StyledTradeHistoryPnlCurve>
    </>
  );
};

export default PnlCurve;
