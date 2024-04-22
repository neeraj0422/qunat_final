import styled from 'styled-components';

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: stretch;
`;

export const Heading = styled.p`
  margin: 0%;
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
export const Desc = styled.p`
  margin: 0%;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const EditPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const Field = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    width: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;
export const FieldName = styled.p`
  margin: 0%;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const PasswordBox = styled.div`
  position: relative;
  padding: 12px 16px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.06) 0%, rgba(199, 215, 248, 0.06) 100%),
    #121212;
  flex: 1 0 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FieldInput = styled.input`
  display: flex;
  align-items: center;
  width: 80%;
  gap: 8px;
  flex: 1 0 0;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.06) 0%, rgba(199, 215, 248, 0.06) 100%),
    #121212;
  border: none;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;

  &:focus {
    outline: none;
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.06) 0%, rgba(199, 215, 248, 0.06) 100%),
      #121212;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    width: 100%;
  }
`;

export const EyeIcon = styled.span`
  position: absolute;
  top: 6px;
  right: 12px;
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 480px) {
    top: 4px;
  }
`;
export const EyeStatus = styled.img`
  width: 24px;
  height: 24px;
`;

export const ErrorText = styled.p`
  margin: 0%;
  text-align: start;
`;

export const Button = styled.button`
  padding: 14px 30px;
  margin: 2rem 0;
  width: 200px;
  border: none;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.14) 0%, rgba(199, 215, 248, 0.14) 100%),
    #121212;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    width: 160px;
    padding: 12px 28px;
    font-size: 12px;
  }
`;
