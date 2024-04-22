import React, { useState } from 'react';
import { StyledStrategiesCard } from '../../Styles/Pages/Strategies';
// import chart from '../../Assets/Dashboard/Performance.png';
import FormButton from '../Common/Form/FormButton';
import apiRequest from '../../api/api';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import StrategyGraph from './StrategyGraph';

const StrategiesCard = ({ strategy }) => {
  const [followed, setFollowed] = useState(() => {
    return strategy.is_followed === 1 ? true : false;
  });

  const handleFollowClick = async () => {
    const result = await Swal.fire({
      title: 'Confirm Follow',
      text: 'Are you sure you want to follow this strategy?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, follow!',
      cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
      try {
        await apiRequest('api/v1/follow-strategy', 'POST', {
          strategy_id: strategy._id
        });
        setFollowed(true);
        window.location.href = `/strategy-detail/${strategy._id}`;
      } catch (error) {
        console.error('Error occured while following strategy:', error);
      }
    }
  };

  const handleUnfollowClick = async () => {
    const result = await Swal.fire({
      title: 'Confirm Unfollow',
      text: 'Are you sure you want to unfollow this strategy?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, unfollow!',
      cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
      try {
        const { responseData } = await apiRequest('api/v1/unfollow-strategy', 'POST', {
          strategy_id: strategy._id
        });
        setFollowed(false);
        toast(responseData.meta.message);
      } catch (error) {
        console.error('Error occured while unfollowing strategy:', error);
      }
    }
  };

  const initialBalance = strategy.initial_balance;
  const currentBalance = strategy.current_balance;
  const diff = currentBalance - initialBalance;
  const ROI = ((diff * 100) / initialBalance).toFixed(2);

  return (
    <>
      <StyledStrategiesCard>
        <Link to={`/strategy-detail/${strategy._id}`} style={{ display: 'contents' }}>
          <div className="strategyCard-head">
            <div className="strategyCard-head-title">
              <div className="strategyCard-title-quant">Quant11</div>
              <div className="strategyCard-title-name">{strategy.strategy_name}</div>
            </div>
            <div className="strategyCard-head-desc">
              <div className="strategyCard-desc-detail">
                <div className="strategyCard-desc-detail-roc">ROI</div>
                <div
                  className={`strategyCard-desc-detail-value ${
                    diff <= 0 ? 'red-text' : 'green-text'
                  }`}>
                  {ROI + '%'}
                </div>
              </div>
              <div className="strategyCard-desc-chart">
                {/* <img src={chart} alt="chart" /> */}
                <StrategyGraph strategy={strategy} />
              </div>
            </div>
          </div>
          <div className="strategyCard-desc">
            <div className="d-flex flex-column gap-2">
              <div>
                Max DowDown:
                <span className="strategyCard-desc-value red-text"> {strategy.drawdown}%</span>
              </div>
              <div>
                Win Rate:
                <span className="strategyCard-desc-value"> {strategy.profit_percentage}%</span>
              </div>
              <div>
                Profit Factor:
                <span className="strategyCard-desc-value"> {strategy.profit_factor}</span>
              </div>
            </div>
            <div>
              <div>
                Time Frame: <span className="strategyCard-desc-value"> {strategy.timeframe}</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="strategyCard-btn">
          {followed ? (
            <FormButton onClick={() => handleUnfollowClick()}>Unfollow</FormButton>
          ) : (
            <FormButton onClick={() => handleFollowClick()}>Follow</FormButton>
          )}
        </div>
      </StyledStrategiesCard>
    </>
  );
};

export default StrategiesCard;
