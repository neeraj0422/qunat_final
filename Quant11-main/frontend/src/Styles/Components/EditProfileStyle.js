import styled from 'styled-components';

export const EditProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 2rem;
`;
export const EditInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
export const FieldInput = styled.input`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.06) 0%, rgba(199, 215, 248, 0.06) 100%),
    #121212;
  border: none;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  width: 100%;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.06) 0%, rgba(199, 215, 248, 0.06) 100%),
    #121212;
  border: none;
  color: white;
  width: 100%;
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px #5e6d96;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Select = styled.select`
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.06) 0%, rgba(199, 215, 248, 0.06) 100%),
    #121212;
  border: none;
  flex: 1 0 0;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  margin: 0%;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 181px;
  }
  @media (max-width: 480px) {
    width: 132px;
    font-size: 12px;
  }
`;

export const Option = styled.option`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin: 0%;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: stretch;
`;
export const Heading = styled.p`
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  margin: 0%;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
export const Desc = styled.p`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin: 0%;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Notification = styled.div`
  display: flex;
  gap: 11px;
  align-items: flex-start;
`;

export const Checkbox = styled.input`
  width: 24px;
  height: 24px;
  appearance: none;
  background-color: transparent;
  border: 2px solid #fff;
  position: relative;
  &:checked {
    &:after {
      content: '\u2713'; /* Unicode checkmark character */
      font-size: 18px;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;
export const Text = styled.p`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin: 0%;
  flex: 1;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Button = styled.button`
  padding: 14px 30px;
  width: 200px;
  border: none;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.14) 0%, rgba(199, 215, 248, 0.14) 100%),
    #121212;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 28px;
    font-size: 12px;
  }
`;
export const FieldInputWrapper = styled.div`
  position: relative;
  width: 70%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
