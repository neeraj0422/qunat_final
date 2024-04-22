import styled from 'styled-components';

export const StyledStrategies = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 24px;
  border-radius: 14px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;

  .strategy-title {
    display: flex;
    align-items: center;
    gap: 15px;

    .stock-name {
      font-size: 24px;
      font-weight: 600;
    }
    .stock-company-name {
      color: rgba(255, 255, 255, 0.72);
    }
  }

  .strategy-list {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export const StyledStrategiesCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 16px;
  border-radius: 14px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.06) 0%, rgba(199, 215, 248, 0.06) 100%),
    #121212;
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.16);

  .strategyCard-head {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .strategyCard-head-title {
      display: flex;
      align-items: center;
      gap: 8px;

      .strategyCard-title-quant {
        color: #efe6fd;
        font-size: 20px;
        padding: 6px 12px;
        border-radius: 4px;
        background: rgba(96, 2, 238, 0.2);
      }
      .strategyCard-title-name {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
      }
    }
    .strategyCard-head-desc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 35px;

      .strategyCard-desc-detail {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .strategyCard-desc-detail-roc {
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
        }
        .strategyCard-desc-detail-value {
          color: #43a047;
          font-size: 24px;
        }

        .green-text {
          color: #43a047;
        }
        .red-text {
          color: red;
        }
      }
    }
    .strategyCard-desc-chart {
      width: 60% !important;
      /* height: auto; */
    }
    .strategy-performence-graph {
      width: 100%;
      height: 5rem !important;
    }
  }

  .strategyCard-desc {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;

    .strategyCard-desc-value {
      color: #fff;
    }
  }

  .strategyCard-btn {
    display: flex;
    justify-content: end;
  }

  @media (min-width: 991px) and (max-width: 1199px) {
    padding: 24px 12px;
  }
`;
