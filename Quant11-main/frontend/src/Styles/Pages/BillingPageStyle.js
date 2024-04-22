import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  overflow-y: auto;
  padding: 20px;
`;

export const HeaderBox = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.p`
  font-size: 32px;
  font-weight: 500;
  color: #fff;
  margin: 0%;

  @media (max-width: 1024px) {
    font-size: 30px;
  }
  @media (max-width: 768px) {
    font-size: 28px;
  }
  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

export const Desc = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  margin: 0%;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const PlanContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 1440px) {
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
    gap: 10px;
  }
  @media (max-width: 480px) {
    gap: 8px;
  }
`;
