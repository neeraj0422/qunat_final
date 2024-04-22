import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  padding: 16px 0px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  width: 100%;
  height: 5rem;

  /* Tablet Styles */
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }

  /* Mobile Styles */
  @media (max-width: 480px) {
    height: auto;
    padding: 6px 0px;
  }
`;

export const CardInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  height: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const DataContainer = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;

  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    align-items: start;
  }
`;

export const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  /* Desktop Styles */
  @media (min-width: 769px) {
  }
  @media (max-width: 480px) {
    width: 100%;
    text-align: start;
    flex-direction: column;
    align-items: start;
    line-height: 12px;
  }
`;

export const Lbox = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100%;

  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 768px) {
    width: 60%;
  }
  @media (max-width: 480px) {
    width: 100%;
    text-align: start;
    align-items: start;
    gap: 4px;
  }
`;

export const Title = styled.p`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  /* line-height: 24px; */
  margin: 0%;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    /* line-height: 18px; */
  }
`;

export const Desc = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  /* line-height: 20px; */
  margin: 0%;

  @media (max-width: 1024px) {
    font-size: 12px;
  }
  @media (max-width: 768px) {
    font-size: 10px;
  }
  @media (max-width: 480px) {
    /* line-height: 12px; */
  }
`;

export const RBox = styled.span`
  display: flex;
  gap: 8px;
  height: 20px;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 480px) {
  }
`;

export const Ellipse = styled.span`
  display: flex;
  height: 20px;
  width: 6px;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    position: absolute;
    top: 0px;
    right: 0px;
  }
`;
export const EllipseImg = styled.img`
  width: 6px;
  height: 6px;
`;

export const Time = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin: 0%;

  @media (max-width: 1024px) {
    font-size: 10px;
  }
  @media (max-width: 768px) {
    font-size: 8px;
  }

  /* Mobile Styles */
  @media (max-width: 480px) {
    text-align: start;
    /* margin-left: 54px; */
  }
`;

export const Reactangle = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid rgba(67, 160, 71, 0.4);
  border: ${(props) =>
    props.status === 'sell'
      ? '1px solid rgba(231, 51, 6, 0.4)'
      : '1px solid rgba(67, 160, 71, 0.4)'};
  background-color: ${(props) =>
    props.status === 'sell' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 128, 0, 0.1)'};
  padding: 10px;

  @media (max-width: 1024px) {
    width: 46px;
    height: 46px;
  }
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

export const ArrowImage = styled.img`
  height: 24px;
  width: 24px;
  object-fit: cover;

  @media (max-width: 1024px) {
    width: 20px;
    height: 20px;
  }
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;
