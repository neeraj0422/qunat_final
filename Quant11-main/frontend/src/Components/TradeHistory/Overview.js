import { StyledTradeHistoryOverview } from '../../Styles/Pages/TradeHistory';

const Overview = ({ strategyDetail }) => {
  const initialBalance = strategyDetail.initial_balance;
  const currentBalance = strategyDetail.current_balance;
  const diff = currentBalance - initialBalance;
  const ROI = ((diff * 100) / initialBalance).toFixed(2);
  const strategyDetailCurrency = strategyDetail?.currency?.toUpperCase() || '';

  return (
    <>
      <StyledTradeHistoryOverview>
        <div className="section-title">Overview</div>
        <div className="overview-content">
          <div className="overview-content-item">
            <li className="overview-content-itemName">Close Trades P&L Amount</li>
            <div className={`overview-content-itemValue ${diff <= 0 ? 'red-text' : 'green-text'}`}>
              {isNaN(diff) ? '-' : parseFloat(diff).toFixed(2)}
              <span> {strategyDetailCurrency}</span>
            </div>
          </div>
          <div className="overview-content-item">
            <li className="overview-content-itemName">ROI %</li>
            <div className={`overview-content-itemValue ${diff <= 0 ? 'red-text' : 'green-text'}`}>
              {isNaN(diff) ? '-' : parseFloat(ROI).toFixed(2)}
            </div>
          </div>
          <div className="overview-content-item">
            <li className="overview-content-itemName">Max Drawdown</li>
            <div className="overview-content-itemValue red-text">
              {isNaN(diff) ? '-' : parseFloat(strategyDetail.drawdown).toFixed(2)}%
            </div>
          </div>
          <div className="overview-content-item">
            <li className="overview-content-itemName">Win Rate</li>
            <div className="overview-content-itemValue">{strategyDetail.profit_percentage}%</div>
          </div>
          <div className="overview-content-item">
            <li className="overview-content-itemName">Time frame </li>
            <div className="overview-content-itemValue">{strategyDetail.timeframe}</div>
          </div>
          <div className="overview-content-item">
            <li className="overview-content-itemName">Profit factor</li>
            <div className="overview-content-itemValue">{strategyDetail.profit_factor}</div>
          </div>
          <div className="overview-content-item">
            <li className="overview-content-itemName">Initial balance</li>
            <div className="overview-content-itemValue">{strategyDetail.initial_balance}</div>
          </div>
        </div>
      </StyledTradeHistoryOverview>
    </>
  );
};

export default Overview;
