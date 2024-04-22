import React, { useEffect, useState } from 'react';
import { StyledDashboard, SyledDashboardSections } from '../../Styles/Pages/Dashboard';
import LatestAlertBox from '../../Components/Dashboard/LatestAlertBox';
import MarketTable from '../../Components/Dashboard/MarketTable';
import { Link, useNavigate } from 'react-router-dom';
import UpArrow from '../../Assets/Dashboard/UpArrow.png';
import DownArrow from '../../Assets/Dashboard/DownArrow.png';
// import PerformanceChart from '../../Assets/Dashboard/Performance.png';
import apiRequest from '../../api/api';
import Performance from '../../Components/Dashboard/Performance';
const moment = require('moment');

const Dashboard = () => {
  const tableHead = ['Asset', 'Change', 'Performance', 'Price', 'Action'];

  const [userName, setUserName] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    fetchUserName();
  }, []);

  const fetchStockList = async () => {
    try {
      const { responseData, error } = await apiRequest('api/v1/stock/list', 'GET');
      if (error) {
        console.error('Error fetching stock data:', error);
      } else {
        return responseData.data;
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const fetchUserName = async () => {
    try {
      const { responseData, error } = await apiRequest('api/v1/user-details', 'GET');
      if (error) {
        console.error('Error fetching stock data:', error);
      } else {
        setUserName(responseData.data);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { responseData, error } = await apiRequest('api/v1/notifications/list', 'POST', {
        limit: 8,
        page: 1,
        type: 'unread'
      });

      if (error) {
        console.error('Error fetching notification data:', error);
      } else {
        setNotificationList(responseData.data);
      }
    } catch (error) {
      console.error('Error fetching notification data:', error);
    }
  };

  const handleClearButtonClick = async () => {
    try {
      const notificationId = notificationList?.map((notification) => notification._id);

      await apiRequest('api/v1/notifications/mark-as-read', 'POST', {
        notificationId
      });

      // Refresh the notification list
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const generateTableData = (marketData) => {
    return marketData.assets?.map((asset) => {
      return {
        Asset: (
          <Link to={`/strategies/${asset?._id}`}>
            <div className="Asset d-flex align-items-center gap-2">
              <div className="asset-image">
                <div>
                  <img src={asset?.asset_image_url} alt="logo" />
                </div>
              </div>
              <div className="stock-desc">
                <div className="stock-name">{asset?.ticker_symbol}</div>
              </div>
            </div>
          </Link>
        ),
        Change: (
          <div className="d-flex align-items-center gap-2">
            <div>
              <img
                src={asset?.change_value <= 0 ? DownArrow : UpArrow}
                alt={asset?.change_value <= 0 ? 'down' : 'up'}
              />
            </div>
            <div className={`change-value ${asset?.change_value <= 0 ? 'red-text' : 'green-text'}`}>
              {asset?.change_value?.toFixed(2)}%
            </div>
          </div>
        ),
        // Performance: <img src={PerformanceChart} alt="chart" />,
        Performance: <Performance chartData={asset.historical_data} />,
        Price: (
          <div className="price-value">
            <span>{asset?.currency_symbol}</span>
            {asset?.price?.toFixed(2)}
          </div>
        ),
        Action: (
          <div className="action-value">
            <Link to={`/strategies/${asset?._id}`}>Strategies</Link>
          </div>
        )
      };
    });
  };

  const ThData = () => {
    return tableHead?.map((data) => {
      return (
        <th className={data} key={data}>
          {data}
        </th>
      );
    });
  };

  useEffect(() => {
    (async () => {
      const tmpStockList = await fetchStockList();
      setStockList(tmpStockList);
      const newStockList = await Promise.all(
        tmpStockList?.map(async (item) => {
          if (item.market_name) {
            for (let i = 0; i < item.assets.length; i++) {
              const { responseData, error } = await apiRequest('api/v1/yahoo-finance', 'POST', {
                ticker_symbol: item.assets[i].ticker_symbol
              });

              // Get current date
              const currentDate = moment();

              // Calculate end date (current date)
              const endDate = currentDate.subtract(1, 'days').format('YYYY-MM-DD');

              // Calculate start date by subtracting 30 days from current date
              const startDate = currentDate.subtract(30, 'days').format('YYYY-MM-DD');

              const historicalData = await apiRequest(
                'api/v1/yahoo-finance/historical-data',
                'POST',
                {
                  ticker_symbol: item.assets[i].ticker_symbol,
                  start_date: startDate,
                  end_date: endDate
                }
              );

              if (error || historicalData?.error) {
                console.error('Error fetching yahoo data:', error);
              } else {
                item.assets[i].change_value =
                  responseData?.data?.price?.regularMarketChangePercent * 100;
                item.assets[i].price = responseData?.data?.price.regularMarketPrice;
                item.assets[i].currency_symbol = responseData?.data?.price.currencySymbol;
                item.assets[i].historical_data = historicalData?.responseData?.data?.map(
                  (data) => data.close
                );
              }
            }
          }
          return item;
        })
      );
      setStockList(newStockList);
    })();
  }, []);

  return (
    <>
      <StyledDashboard>
        <div className="welcome-title">Hi, {userName.first_name} Welcome to Quant11</div>
        <SyledDashboardSections>
          <div className="section-title-allBtn">
            <div className="section-title">Latest Alerts</div>
            <div className="section-allBtn-main">
              <div className="section-allBtn" onClick={handleClearButtonClick}>
                Clear
              </div>
              <div className="section-allBtn" onClick={() => navigate('/notification')}>
                More
              </div>
            </div>
          </div>
          <div className="alert-boxes">
            {notificationList?.length > 0 ? (
              <>
                {notificationList?.map((notification) => (
                  <LatestAlertBox
                    key={notification._id}
                    stockImg={notification.asset_image_url}
                    stockName={notification.ticker_symbol}
                    stockPrice={notification.price}
                    // stockPercentage={notification.action}
                    stockAction={notification.action}
                  />
                ))}
              </>
            ) : (
              <p>No latest alerts</p>
            )}
          </div>
        </SyledDashboardSections>
        {stockList?.map((marketData) => (
          <SyledDashboardSections key={marketData.market_name}>
            <div className="section-title-allBtn">
              <div className="section-title">{marketData.market_name}</div>
              <Link to={`/view-all/${marketData?.market_id}`}>
                <div className="section-allBtn">View all</div>
              </Link>
            </div>
            <MarketTable tableHead={ThData()} tableData={generateTableData(marketData)} />
          </SyledDashboardSections>
        ))}
      </StyledDashboard>
    </>
  );
};

export default Dashboard;
