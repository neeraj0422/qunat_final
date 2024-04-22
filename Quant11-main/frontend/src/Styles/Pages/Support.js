import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 24px;
  height: 100%;
  width: 100%;
  margin: 0 10%;
  top: 0%;

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
  /* mobile Styles */
  @media (max-width: 480px) {
    gap: 12px;
    margin: auto 0px;
  }
`;

export const Title = styled.p`
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  margin: 0%;

  /* mobile Styles */
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
export const ContactCardContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: space-between;

  @media (max-width: 560px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ContactCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  width: 50%;
  border-radius: 14px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.16);

  @media (max-width: 1440px) {
    gap: 8px;
  }

  @media (max-width: 560px) {
    width: 100%;
  }
`;
export const ContactIconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 100%;
  background-color: #242629;
`;
export const ContactIcon = styled.img`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
`;
export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const Desc = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin: 0%;

  /* mobile Styles */
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
export const Contact = styled.p`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin: 0%;
  text-align: start;
  text-justify: auto;

  /* mobile Styles */
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Heading = styled.p`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  margin: 0%;

  /* mobile Styles */
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: stretch;
  padding-bottom: 2rem;

  /* mobile Styles */
  @media (max-width: 480px) {
    gap: 20px;
  }
`;
