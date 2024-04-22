import React from 'react';

// const LatestAlertBox = ({ stockImg, stockName, stockPrice, stockPercentage }) => {
const LatestAlertBox = ({ stockImg, stockName, stockPrice, stockAction }) => {
  return (
    <>
      <div className="alert-box">
        <div className="name">
          <img src={stockImg} alt={stockName} className="notification-image" />
          {/* <img src={process.env.REACT_APP_API_BASE_URL + stockImg} alt={stockName} /> */}
          {stockName}
        </div>
        {/* <div className="price">{`${stockAction} at ${stockPrice}`}</div> */}
        <div className="alertBoxText">{`${stockAction} at ${stockPrice.toFixed(2)}`}</div>
        {/* <div className="percentage">{stockPercentage}</div> */}
      </div>
    </>
  );
};

export default LatestAlertBox;
