import React, { useEffect, useState } from 'react';
import {
  StyledSignUpMainSignUp,
  StyledSignUpPage,
  StyledSignUpPageLogo
} from '../../Styles/Pages/SignUp';
import Logo from '../../Components/Logo/Logo';
import MainSignUp from '../../Components/SignUp/MainSignUp';
import { StyledStepProgressBar } from '../../Styles/Components/StepProgressBar';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const totalSteps = 3; // Set the total number of steps
  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const isVerified = localStorage.getItem('isVerified');
    if (token && isVerified && parseInt(isVerified)) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (location?.state?.currentStep) {
      setCurrentStep(parseInt(location.state.currentStep));
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

  const handleNextForm = (phoneNumber) => {
    setCurrentStep(currentStep + 1);
    setPhoneNumber(phoneNumber);
  };

  const handlePrevForm = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <StyledSignUpPage>
      <StyledSignUpPageLogo>
        <Logo />
      </StyledSignUpPageLogo>

      <div className="container">
        <StyledStepProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <StyledSignUpMainSignUp className="container">
        <MainSignUp
          currentStep={currentStep}
          phoneNumber={phoneNumber}
          onSubmit={handleNextForm}
          onBack={handlePrevForm}
        />
      </StyledSignUpMainSignUp>
    </StyledSignUpPage>
  );
};

export default SignUp;
