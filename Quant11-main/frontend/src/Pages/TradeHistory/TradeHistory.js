import BreadCrumb from '../../Components/Common/BreadCrumb/BreadCrumb';
import { StyledDetailPage, StyledDetailPageHeader } from '../../Styles/Pages/Dashboard';
import React, { useEffect, useState } from 'react';
import FormButton from '../../Components/Common/Form/FormButton';
// import GoogleIcon from '../../Assets/Dashboard/GoogleIcon.png';
import Overview from '../../Components/TradeHistory/Overview';
import PnlCurve from '../../Components/TradeHistory/PnlCurve';
import { StyledTradeHistoryDataTable } from '../../Styles/Pages/TradeHistory';
import HistoryDataTable from '../../Components/TradeHistory/HistoryDataTable';
import apiRequest from '../../api/api';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { toast } from 'react-toastify';

const TradeHistory = () => {
  const { stockDetailId } = useParams();
  const [strategyDetail, setStrategyDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const fetchStrategyDetail = async () => {
      try {
        const { responseData } = await apiRequest('api/v1/strategies/details', 'POST', {
          id: stockDetailId
        });
        const data = await responseData.data;
        setStrategyDetail(data);
        setFollowed(responseData.meta.is_followed);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStrategyDetail();
  }, [stockDetailId, loading]);

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
        const { responseData } = await apiRequest('api/v1/follow-strategy', 'POST', {
          strategy_id: stockDetailId
        });
        setFollowed(true);
        toast(responseData.meta.message);
      } catch (error) {
        console.error('Error following strategy:', error);
      }
    }
  };

  const handleUnfollowClick = async () => {
    const result = await Swal.fire({
      title: 'Confirm unfollow',
      text: 'Are you sure you want to unfollow this strategy?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, unfollow!',
      cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
      try {
        const { responseData } = await apiRequest('api/v1/unfollow-strategy', 'POST', {
          strategy_id: stockDetailId
        });
        setFollowed(false);
        toast(responseData.meta.message);
      } catch (error) {
        console.error('Error following strategy:', error);
      }
    }
  };

  return (
    <>
      <StyledDetailPage>
        <BreadCrumb />
        <StyledDetailPageHeader>
          <div className="tradeHistory-head">
            <div className="tradeHistory-left">
              <div className="viewAll-content">
                <div className="viewAll-title">{strategyDetail.strategy_name}</div>
                <div className="viewAll-desc">
                  <div>Recommended Stop & Loss - {strategyDetail.stop_loss}%</div>
                  <div className="d-flex align-items-center gap-2">
                    {/*<img src={GoogleIcon} alt="google" /> */}
                    {strategyDetail.asset_name}
                  </div>
                </div>
              </div>
            </div>
            <div className="tradeHistory-right">
              <div className="right-sideBG">
                <div className="tradeHistory-rightBtn">
                  {followed ? (
                    <FormButton onClick={() => handleUnfollowClick()}>Unfollow</FormButton>
                  ) : (
                    <FormButton onClick={() => handleFollowClick()}>Follow</FormButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </StyledDetailPageHeader>

        <div className="overview-pnlCurve">
          <Overview strategyDetail={strategyDetail} />
          <PnlCurve />
        </div>
        <StyledTradeHistoryDataTable>
          <div className="section-title">Open Trades</div>
          <HistoryDataTable apiEndpoints="api/v1/trades/open" category="open" />
        </StyledTradeHistoryDataTable>
        <StyledTradeHistoryDataTable>
          <div className="section-title">Close Trades</div>
          <HistoryDataTable apiEndpoints="api/v1/trades/close" category="close" />
        </StyledTradeHistoryDataTable>
      </StyledDetailPage>
    </>
  );
};

export default TradeHistory;
