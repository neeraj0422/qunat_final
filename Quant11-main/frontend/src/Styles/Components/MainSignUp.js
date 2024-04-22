import styled from 'styled-components';

export const StyledMainSignInUp = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  padding: 40px;
  margin: 70px 0;
  border-radius: 14px;
  background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),
    #121212;
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.16);

  .react-date-picker {
    width: 100%;
  }
  .react-date-picker__wrapper {
    color: rgba(255, 255, 255, 0.4);
    padding: 8px 16px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 4px;
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.08) 0%, rgba(199, 215, 248, 0.08) 100%),
      #121212;
  }

  .signup-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 118px;
  }

  .signUp-image-container {
    text-align: center;
    .image-title {
      font-size: 32px;
    }
  }
  .signup-form-main {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 24px;
  }

  .signup-form-main-inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .label-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }

  .signup-form-main-other {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;

    .other-or {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      &:after {
        content: '';
        display: block;
        height: 1px;
        width: 100%;
        background: currentColor;
        opacity: 0.15;
        margin-left: 10px;
      }
      &:before {
        content: '';
        display: block;
        height: 1px;
        width: 100%;
        background: currentColor;
        opacity: 0.15;
        margin-right: 10px;
      }
    }

    .other-google {
      display: flex;
      width: 100%;
      padding: 14px 60px;
      justify-content: center;
      align-items: center;
      /* border-radius: 4px; */
      /* border: 1px solid #fff; */
      /* cursor: pointer; */
    }
  }
  .signUp-form-dob {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 155px;
  }

  .signUp-form-experience {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .risk-low {
    border: 1px #6002ee solid;
    border-top-left-radius: 14px !important;
    border-bottom-left-radius: 14px !important;
  }
  .risk-medium {
    border: 1px #6002ee solid;
  }
  .risk-high {
    border: 1px #6002ee solid;
    border-top-right-radius: 14px !important;
    border-bottom-right-radius: 14px !important;
  }

  .filter-experience {
    display: flex;
    align-items: center;

    .button {
      float: left;
      width: 100%;
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

  .select-experience {
    margin: 25px 0;
    .filter-experience {
      gap: 10px;
      margin: 12px 0px;
    }
    .filter-experience .button label {
      font-size: 18px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: linear-gradient(
          0deg,
          rgba(199, 215, 248, 0.08) 0%,
          rgba(199, 215, 248, 0.08) 100%
        ),
        #121212;
    }
  }

  @media (max-width: 767px) {
    width: 100% !important;
    padding: 25px;
    margin: 35px 0;

    .signup-wrapper {
      gap: 50px;
      flex-direction: column;
    }

    .signUp-form-dob {
      gap: 50px;
    }

    .filter-experience {
      .button label {
        font-size: 14px;
      }
    }

    .select-experience {
      .filter-experience {
        .button label {
          font-size: 16px;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 990px) {
    width: 85% !important;
    padding: 25px;

    .signup-wrapper {
      gap: 50px;
      flex-direction: column;
    }
    .signUp-form-container {
      width: 100%;
    }

    .signup-form-main-other {
      .other-google {
        padding: 14px 30px;
      }
    }
    .signUp-form-dob {
      gap: 100px;
    }
  }
  @media (min-width: 991px) and (max-width: 1199px) {
    width: 90% !important;
    padding: 30px;

    .signup-wrapper {
      gap: 80px;
    }
  }
`;
