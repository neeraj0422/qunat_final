import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StyledDetailPage, StyledDetailPageHeader } from '../../Styles/Pages/Dashboard';
import MarketTable from '../../Components/Dashboard/MarketTable';
import SearchIcon from '../../Assets/Dashboard/SearchIcon.png';
import UpArrow from '../../Assets/Dashboard/UpArrow.png';
import DownArrow from '../../Assets/Dashboard/DownArrow.png';
// import PerformanceChart from '../../Assets/Dashboard/Performance.png';
import apiRequest from '../../api/api';
import Performance from '../../Components/Dashboard/Performance';
import moment from 'moment';

const ViewAll = () => {
  const tableHead = ['Asset', 'Change', 'Performance', 'Price', 'Action'];
  const { marketId } = useParams();
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchYahooData = async (tickerSymbol) => {
      try {
        const { responseData, error } = await apiRequest('api/v1/yahoo-finance', 'POST', {
          ticker_symbol: tickerSymbol
        });
        if (error) {
          console.error(`Error fetching Yahoo data for ${tickerSymbol}:`, error);
          return null;
        }
        return responseData?.data?.price;
      } catch (error) {
        console.error(`Error fetching Yahoo data for ${tickerSymbol}:`, error);
        return null;
      }
    };

    const fetchStockListWithYahooData = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const { responseData } = await apiRequest('api/v1/market/assets', 'POST', {
          id: marketId,
          page: page,
          limit: 10
        });
        if (responseData.data.length > 0) {
          const updatedStockList = await Promise.all(
            responseData.data.map(async (asset) => {
              const yahooData = await fetchYahooData(asset.ticker_symbol);

              // Get current date
              const currentDate = moment();
              const endDate = currentDate.subtract(1, 'days').format('YYYY-MM-DD');
              const startDate = currentDate.subtract(30, 'days').format('YYYY-MM-DD');

              const historicalData = await apiRequest(
                'api/v1/yahoo-finance/historical-data',
                'POST',
                {
                  ticker_symbol: asset?.ticker_symbol,
                  start_date: startDate,
                  end_date: endDate
                }
              );

              // if (error || historicalData.error) {
              //   console.error('Error fetching yahoo data:', error);
              // } else {
              //   item.assets[i].change_value =
              //     responseData?.data?.price.regularMarketChangePercent * 100;
              //   item.assets[i].price = responseData?.data?.price.regularMarketPrice;
              //   item.assets[i].currency_symbol = responseData?.data?.price.currencySymbol;
              //   item.assets[i].historical_data = historicalData?.responseData?.data?.map(
              //     (data) => data.close
              //   );
              // }

              if (yahooData && !historicalData.error) {
                asset.change_value = yahooData.regularMarketChangePercent;
                asset.price = yahooData.regularMarketPrice;
                asset.currency_symbol = yahooData.currencySymbol;
                asset.historical_data = historicalData?.responseData?.data?.map(
                  (data) => data.close
                );
              }
              return asset;
            })
          );

          setStockList((prevList) => [...prevList, ...updatedStockList]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        fetchStockListWithYahooData();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 1.0
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [marketId, loading, hasMore, page]);

  const generateTableData = () => {
    return stockList.map((asset) => ({
      Asset: (
        <Link to={`/strategies/${asset?._id}`} key={asset._id}>
          <div className="Asset d-flex align-items-center gap-2">
            <div className="asset-image">
              <div>
                <img src={asset.asset_image_url} alt="logo" />
              </div>
            </div>
            <div className="stock-desc">
              <div className="stock-name">{asset.ticker_symbol}</div>
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
    }));
  };

  const ThData = () => {
    return tableHead.map((data) => {
      return (
        <th className={data} key={data}>
          {data}
        </th>
      );
    });
  };

  return (
    <>
      <StyledDetailPage>
        <StyledDetailPageHeader>
          <div className="viewAll-head">
            <div className="viewAll-left">
              <div className="viewAll-img">
                <img src={SearchIcon} alt="searchIcon" />
              </div>
              <div className="viewAll-content">
                <div className="viewAll-title"> {stockList.market_name}</div>
                <div className="viewAll-desc">Choose your assets for Trade signals</div>
              </div>
            </div>
          </div>
        </StyledDetailPageHeader>
        <MarketTable tableHead={ThData()} tableData={generateTableData(stockList)} />
        <div ref={loaderRef} />
      </StyledDetailPage>
    </>
  );
};

export default ViewAll;
