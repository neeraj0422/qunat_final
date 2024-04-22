import React, { useEffect, useRef, useState } from 'react';
import BreadCrumb from '../../Components/Common/BreadCrumb/BreadCrumb';
import { StyledDetailPage, StyledDetailPageHeader } from '../../Styles/Pages/Dashboard';
import StrategyHeadBG from '../../Assets/Dashboard/StrategyHeadBG.png';
import { StyledStrategies } from '../../Styles/Pages/Strategies';
import StrategiesCard from '../../Components/Strategies/StrategiesCard';
import apiRequest from '../../api/api';
import { useParams } from 'react-router-dom';

const Strategies = () => {
  const { stockId } = useParams();
  const [strategiesList, setStrategiesList] = useState([]);
  const [strategyName, setStrategyName] = useState(null);
  const [tickerName, setTickerName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchStrategiesList = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const { responseData } = await apiRequest('api/v1/assets/strategies', 'POST', {
          id: stockId,
          page: page,
          limit: 5
        });
        if (responseData.data.values.length > 0) {
          const strategy = responseData.data;
          setStrategiesList((prevList) => [...prevList, ...strategy.values]);
          setStrategyName(strategy.asset_name);
          setTickerName(strategy.ticker_symbol);
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
        fetchStrategiesList();
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
  }, [stockId, loading, hasMore, page]);

  return (
    <>
      <StyledDetailPage>
        <BreadCrumb />
        <StyledDetailPageHeader>
          <div className="viewAll-head">
            <div className="viewAll-left">
              <div className="viewAll-content">
                <div className="viewAll-title">Trading strategies</div>
                <div className="viewAll-desc">Let our smart strategies work for you 24/7.</div>
              </div>
            </div>
            <div className="viewAll-right">
              <img src={StrategyHeadBG} alt="Icon" />
            </div>
          </div>
        </StyledDetailPageHeader>

        <StyledStrategies>
          <div className="strategy-title">
            <div className="stock-name">{tickerName}</div>
            {strategyName ? <li className="stock-company-name">{strategyName}</li> : ''}
          </div>
          <div className="strategy-list">
            {strategiesList.length > 0 ? (
              <>
                {strategiesList.map((strategy) => (
                  <StrategiesCard key={strategy._id} strategy={strategy} />
                ))}
              </>
            ) : (
              <p>No Strategies</p>
            )}
            <div ref={loaderRef}></div>
          </div>
        </StyledStrategies>
      </StyledDetailPage>
    </>
  );
};

export default Strategies;
