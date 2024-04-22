import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  padding: 10px 42px;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.08) 0%, rgba(199, 215, 248, 0.08) 100%),
    #121212;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
  height: 85px;

  @media (max-width: 767px) {
    padding: 10px 22px;
  }
`;
