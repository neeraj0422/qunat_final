import styled from 'styled-components';

export const StyledTradeHistoryOverview = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;
  width: 40%;

  .overview-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .overview-content-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
  }
  .overview-content-itemName {
    color: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 767px) {
    width: 100%;

    .overview-content-item {
      font-size: 14px;
      padding: 6px 0;
    }
  }
`;

export const StyledTradeHistoryPnlCurve = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;
  width: 60%;

  .pnl-curve-container {
    height: 100% !important;
    width: 100% !important;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const StyledTradeHistoryDataTable = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;

  .sc-jcVcfa {
    border-radius: 0 !important;
  }
  .rdt_TableHeadRow {
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.08) 0%, rgba(199, 215, 248, 0.08) 100%),
      #121212 !important;
    color: #fff !important;
    font-size: 16px;
  }
  .rdt_TableRow {
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
      #121212;
    font-size: 14px;
    color: #ffffff;
  }

  .rdt_Pagination {
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.08) 0%, rgba(199, 215, 248, 0.08) 100%),
      #121212 !important;
    color: #fff !important;
  }

  #pagination-first-page,
  #pagination-previous-page,
  #pagination-next-page,
  #pagination-last-page {
    color: #ffffff !important;
    fill: #ffffff !important;
  }

  .no-data {
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.08) 0%, rgba(199, 215, 248, 0.08) 100%),
      #121212 !important;
    color: #ffffff;
    padding: 20px 0;
    width: 100%;
    text-align: center;
  }
`;
