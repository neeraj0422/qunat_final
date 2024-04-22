import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 2rem 8rem;

  @media (max-width: 1440px) {
    padding: 2rem 4rem;
  }
  @media (max-width: 1024px) {
    padding: 1rem 2rem;
  }
  @media (max-width: 768px) {
    padding: 1rem 1rem;
  }

  /* Mobile Styles */
  @media (max-width: 480px) {
    padding: 0px 0px;
  }
`;
