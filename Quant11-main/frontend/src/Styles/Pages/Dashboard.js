import styled from 'styled-components';
import TitleBG from '../../Assets/Dashboard/TitleBG.png';
import TradeHistoryBG from '../../Assets/Dashboard/TradeHistoryBG.png';

export const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .welcome-title {
    border-radius: 14px;
    // background: linear-gradient(0deg, rgba(199, 215, 248, 0.06) 0%, rgba(199, 215, 248, 0.06) 100%),
    //   url(${TitleBG});
    background: linear-gradient(
        90deg,
        rgba(29, 30, 32, 0.2) -2.2%,
        #1d1e20 85%,
        rgba(29, 30, 32, 0.2) 100%
      ),
      url(${TitleBG});
    padding: 24px 20px;
    font-size: 20px;
    background-repeat: no-repeat;
    background-position: right;
  }
`;

export const SyledDashboardSections = styled.section`
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  border-radius: 14px;
  gap: 16px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;

  .section-title-allBtn {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .section-title {
      font-size: 20px;
    }
    .section-allBtn-main {
      display: flex;
      gap: 20px;
    }
    .section-allBtn {
      color: #b68bf7;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .alert-boxes {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    gap: 10px;
    overflow: auto;

    .alert-box {
      display: flex;
      padding: 12px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      max-width: 100%;
      gap: 6px;
      border-radius: 14px;
      font-size: 14px;
      background: linear-gradient(
          0deg,
          rgba(199, 215, 248, 0.08) 0%,
          rgba(199, 215, 248, 0.08) 100%
        ),
        #121212;

      .name {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .price {
        font-weight: 600;
      }
      .percentage {
        font-size: 14px;
        color: #43a047;
      }
    }
  }

  .alertBoxText {
    text-wrap: nowrap;
  }
  .notification-image {
    height: 2rem;
    border-radius: 50%;
  }

  @media (max-width: 767px) {
    padding: 16px;

    /* .alert-boxes {
      flex-wrap: wrap;

      .alert-box {
        width: 45%;
        align-items: center;
      }
    } */
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    padding: 32px 24px;
    .alert-boxes {
      flex-direction: row;
    }
  }
`;

export const StyledMarketTable = styled.div`
  table {
    width: 100%;
  }
  th {
    padding: 14px 12px;
    font-weight: 400;
  }
  td {
    padding: 14px 12px;
  }
  td,
  th {
    &:first-child {
      min-width: 240px;
    }
  }

  .performnce-chart {
    height: 60px !important;
    width: 160px !important;
  }

  tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);

    @media (max-width: 767px) {
      td,
      th {
        &:first-child {
          min-width: 150px;
          position: sticky;
          left: 0;
          background: linear-gradient(
              0deg,
              rgba(199, 215, 248, 0.08) 0%,
              rgba(199, 215, 248, 0.08) 100%
            ),
            #121212;
        }

        &:last-child {
          display: none;
        }
      }
    }
  }
  .table-header {
    height: 52px;
    border-radius: 4px 0px;
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.08) 0%, rgba(199, 215, 248, 0.08) 100%),
      #121212;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
  }
  .asset-image {
    background: #ffffff;
    color: #000000;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    padding: 5px;
    overflow: hidden;
  }

  .stock-desc {
    .stock-name {
      color: rgba(255, 255, 255, 0.8);
    }
    .stock-company {
      font-size: 12px;
    }
  }

  .change-value {
    color: #43a047;
  }

  .action-value {
    color: #b68bf7;
    text-decoration: underline;
  }

  @media (max-width: 767px) {
    overflow: auto;

    .table-header {
      font-size: 14px;
    }
    .table-content {
      font-size: 12px;
    }

    th {
      padding: 16px 22px;
    }

    td {
      padding: 8px;
    }
    .asset-image {
      width: 40px;
      height: 40px;
      padding: 3px;
    }

    .stock-desc {
      .stock-name {
        font-size: 12px;
      }
      .stock-company {
        font-size: 10px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    td,
    th {
      padding: 14px 8px;
      font-size: 14px;
      &:first-child {
        min-width: 200px;
      }
    }
  }
`;

export const StyledDetailPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .table-content {
    background: #191a1b;
  }

  .section-title {
    font-size: 24px;

    @media (max-width: 767px) {
      font-size: 20px;
    }
  }

  .overview-pnlCurve {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 767px) {
      flex-direction: column;
    }
  }
`;

export const StyledDetailPageHeader = styled.section`
  .viewAll-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 14px;
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
      #121212;
    padding: 45px 24px;
  }
  .viewAll-left {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .viewAll-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .viewAll-title {
    font-size: 24px;
  }
  .viewAll-desc {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .tradeHistory-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 14px;
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
      #121212;
  }
  .tradeHistory-left {
    display: flex;
    align-items: center;
    padding: 45px 24px;
  }
  .tradeHistory-right {
    width: 50%;
    height: 160px;
  }
  .right-sideBG {
    background: url(${TradeHistoryBG}) no-repeat;
    background-size: contain;
    background-position: right;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .tradeHistory-rightBtn {
    margin: 0 24px;
  }

  @media (max-width: 767px) {
    .viewAll-head {
      padding: 25px 12px;
    }
    .viewAll-title {
      font-size: 18px;
    }
    .viewAll-desc {
      font-size: 14px;
      flex-direction: column;
    }
    .viewAll-content {
      align-items: center;
    }
    .tradeHistory-head {
      flex-direction: column;
    }
    .tradeHistory-left {
      padding: 25px 12px;
    }
    .tradeHistory-right {
      width: 100%;
      height: 80px;
    }
    .right-sideBG {
      justify-content: center;
    }
  }

  @media (min-width: 768px) and (max-width: 990px) {
    .viewAll-desc {
      flex-direction: column;
    }
    .viewAll-title {
      font-size: 20px;
    }
    .viewAll-desc {
      font-size: 14px;
    }
    .tradeHistory-left {
      padding: 12px 24px;
      width: 100%;
    }
    .tradeHistory-right {
      width: 100%;
      height: 140px;
    }
  }
`;
