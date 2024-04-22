import styled from 'styled-components';

export const StyledFormTitle = styled.div`
  font-size: 24px;
`;

export const StyledFormLabel = styled.label`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
`;

export const StyledFormInput = styled.input`
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

export const StyledFormSelect = styled.select`
  color: rgba(255, 255, 255, 0.4);
  padding: 12px 16px;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 4px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.08) 0%, rgba(199, 215, 248, 0.08) 100%),
    #121212;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

  // option {
  //   padding: 12px 16px;
  // }
`;

export const StyledFormButton = styled.button`
  display: flex;
  padding: 14px 60px;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.14) 0%, rgba(199, 215, 248, 0.14) 100%),
    #121212;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
    /* Add any additional styles for the disabled state */
  }
`;

export const StyledOtpInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #ffffffcc !important;
  outline: none;
  color: #ffffff;
  width: 75px;
  text-align: center;
`;

export const StyledBreadCrumb = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  padding: 10px;

  //.breadcrumb-link {
  //  text-decoration: none;
  //  color: #007bff;
  //}

  .breadcrumb-text {
    margin: 0 5px;
  }
`;
