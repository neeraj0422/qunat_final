import styled from 'styled-components';

export const StyledSignUpPage = styled.div`
  //   display: flex;
`;

export const StyledSignUpPageLogo = styled.div`
  padding: 15px 0;
  margin: 0 90px;
  height: 100px;

  @media (max-width: 990px) {
    margin: auto;
    text-align: center;
  }
`;

export const StyledSignUpMainSignUp = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSignupMobileMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
export const StyledSignupMobileContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const StyledSignupCountryCode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;
export const StyledSignupMobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 60%;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledSelect = styled.select`
  color: rgba(255, 255, 255, 0.4);
  padding: 12px 16px;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 4px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.08) 0%, rgba(199, 215, 248, 0.08) 100%),
    #121212;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`;

export const StyledNumberInput = styled.input`
  color: rgba(255, 255, 255, 0.4);
  padding: 12px 16px;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 4px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.08) 0%, rgba(199, 215, 248, 0.08) 100%),
    #121212;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  appearance: none;
`;
