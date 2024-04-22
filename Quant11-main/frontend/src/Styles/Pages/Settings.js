import styled from 'styled-components';

export const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 80%;
  margin: auto;

  .main-title {
    font-size: 24px;
  }
  .setting-accordion {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 75vh;
  }
  .setting-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .tag-line {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    margin: 10px 0;
  }

  .setting-button {
    margin: 20px 0;
    width: fit-content;
    padding: 14px 30px;
    border-radius: 4px;
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.14) 0%, rgba(199, 215, 248, 0.14) 100%),
      #121212;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    .tag-line {
      font-size: 12px;
    }
  }

  @media (max-width: 990px) {
    width: 100%;
  }
`;

export const SettingsManageRiskAppetite = styled.div`
  .title {
    font-size: 18px;
  }

  .risk-slider {
    width: 50%;
    margin: 20px;
    position: relative;
  }

  @media (max-width: 767px) {
    .title {
      font-size: 14px;
    }
    .risk-slider {
      width: 100%;
      font-size: 13px;
      margin: 0;
    }
  }
  @media (min-width: 991px) and (max-width: 1199px) {
    .risk-slider {
      width: 70%;
    }
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 16px;
    cursor: pointer;
  }

  input[type='range']::-moz-range-track {
    width: 100%;
    height: 16px;
  }

  input[type='range']::-ms-track {
    width: 100%;
    height: 16px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }

  /* Special styling for WebKit/Blink */
  input[type='range']::-webkit-slider-thumb {
    width: 25px;
    margin-top: -5px;
    height: 25px;
    border-radius: 50%;
    background: #6002ee;
    border: 3px solid #b6c2e2;
    -webkit-appearance: none;
  }

  /* All the same stuff for Firefox */
  input[type='range']::-moz-range-thumb {
    margin-top: -5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #6002ee;
    border: 3px solid #b6c2e2;
    -webkit-appearance: none;
  }

  /* All the same stuff for IE */
  input[type='range']::-ms-thumb {
    margin-top: -5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #6002ee;
    border: 3px solid #b6c2e2;
    -webkit-appearance: none;
  }
`;

export const SettingsManageTradeExperience = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .select-experience {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;

    .button {
      float: left;
      padding: 25px 0;
      position: relative;
    }

    .button label,
    .button input {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .button input[type='radio'] {
      opacity: 0.011;
      z-index: 100;
    }

    .button input[type='radio']:checked + label {
      background: rgba(255, 114, 0, 0.1);
      color: #ff7200;
      //border-radius: 4px;
    }

    .button label {
      cursor: pointer;
      z-index: 90;
      line-height: 1.8em;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0;
    }
  }
  .experience-box {
    width: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
      #121212;
  }

  @media (max-width: 767px) {
    .select-experience {
      width: 100%;
      gap: 5px;

      .button {
        padding: 30px 0;
        label {
          font-size: 12px;
        }
      }

      .experience-box {
        width: 100%;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 990px) {
    .select-experience {
      width: 100%;
    }
  }

  @media (min-width: 991px) and (max-width: 1199px) {
    .select-experience {
      width: 100%;
      gap: 10px;
    }
    .button label {
      font-size: 14px;
    }
  }
`;

export const SettingsNotification = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;

  .switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 25px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #938f99;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 21px;
    width: 21px;
    left: 3px;
    bottom: 2px;
    background-color: #6002ee;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #d0bcff;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #d0bcff;
  }

  input:checked + .slider:before {
    transform: translateX(18px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  @media (max-width: 767px) {
    .notification-name {
      font-size: 14px;
    }
  }
`;

export const SettingsAccordionWrapper = styled.div`
  padding: 5px 16px;
  border-radius: 14px;
  border-bottom: 1px solid #222;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.16);

  @media (max-width: 767px) {
    padding: 5px 10px;
  }
`;
export const SettingsAccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;

  @media (max-width: 767px) {
    padding: 10px 0;
    font-size: 14px;
  }
`;
export const SettingsAccordionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .round {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #242629;
    border-radius: 50%;
  }
`;
export const SettingsAccordionArrow = styled.div``;
export const SettingsAccordionContent = styled.div`
  padding: 16px 42px;
  border-top: 2px solid #303132;

  @media (max-width: 767px) {
    padding: 16px 10px;
  }
  @media (min-width: 991px) and (max-width: 1199px) {
    padding: 16px;
  }
`;
