import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  height: 100%;
  width: 100%;
  margin: 0 10%;

  /* desktop */
  @media (max-width: 1440px) {
    margin: 0 4%;
  }

  @media (max-width: 1024px) {
    margin: 0 2rem;
  }

  /* Tablet Styles */
  @media (max-width: 768px) {
    margin: 0 0rem;
  }
  /* Tablet Styles */
  @media (max-width: 480px) {
    gap: 12px;
    margin: auto 0px;
  }
`;

export const MainTitle = styled.p`
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  margin: 0%;

  /* Mobile Styles */
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const Box = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  height: 74vh;
  padding: 32px 24px;
  overflow-y: hidden;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;
  overflow: auto;

  /* Mobile Styles */
  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

export const Title = styled.p`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin: 0px 0px 0px 0px;

  /* Mobile Styles */
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const NotificationCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;
`;
