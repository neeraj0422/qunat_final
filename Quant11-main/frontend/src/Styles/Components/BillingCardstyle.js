import styled from 'styled-components';

export const CardContainer = styled.div`
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;
  width: 290px;
  position: relative;

  @media (max-width: 1440px) {
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 480px) {
  }
`;

export const BillingHeader = styled.div`
  display: flex;
  padding: 40px 24px 0px 24px;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    padding: 36px 20px 0px 20px;
  }
  @media (max-width: 480px) {
    padding: 32px 16px 0px 16px;
  }
`;

export const PlanPrice = styled.p`
  color: #fff;
  text-align: center;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  margin: 0%;
  margin-bottom: 16px;

  @media (max-width: 1024px) {
    font-size: 32px;
  }
  @media (max-width: 768px) {
    font-size: 28px;
  }
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const PlanName = styled.p`
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  margin: 0%;
  margin-bottom: 4px;

  @media (max-width: 1024px) {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Algo = styled.p`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
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

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 16px;
  margin-bottom: 90px;

  @media (max-width: 1024px) {
    gap: 14px;
  }
  @media (max-width: 768px) {
    gap: 10px;
  }
  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const FeatureContainer = styled.div`
  display: flex;
  gap: 12px;
  //flex-wrap: wrap;
  text-justify: auto;
  align-items: center;
`;

export const CheckIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Feature = styled.p`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-justify: auto;
  margin: 0;

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

export const ButtonSection = styled.div`
  display: flex;
  padding: 0px 16px 32px 16px;
  flex-direction: column;
  align-self: stretch;
  position: absolute;
  bottom: 0;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 0px 14px 30px 14px;
  }
  @media (max-width: 768px) {
    padding: 0px 12px 30px 12px;
  }
  @media (max-width: 480px) {
    padding: 0px 10px 28px 10px;
  }
`;
export const Button = styled.button`
  color: #fff;
  padding: 14px 50px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.14) 0%, rgba(199, 215, 248, 0.14) 100%),
    #121212;
  border: none;
  font-size: 16px;

  @media (max-width: 1024px) {
    padding: 12px 48px;
    font-size: 14px;
  }
  @media (max-width: 768px) {
    padding: 10px 46px;
    font-size: 12px;
  }
  @media (max-width: 480px) {
    padding: 8px 44px;
    font-size: 10px;
  }
`;
