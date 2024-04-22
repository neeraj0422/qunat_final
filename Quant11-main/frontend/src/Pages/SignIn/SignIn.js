import MainSignIn from '../../Components/SignIn/MainSignIn';
import {
  StyledSignUpMainSignUp,
  StyledSignUpPage,
  StyledSignUpPageLogo
} from '../../Styles/Pages/SignUp';
import Logo from '../../Components/Logo/Logo';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const isVerified = localStorage.getItem('isVerified');
    if (token && isVerified && parseInt(isVerified)) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <StyledSignUpPage>
        <StyledSignUpPageLogo>
          <Logo />
        </StyledSignUpPageLogo>
        <StyledSignUpMainSignUp className="container">
          <MainSignIn />
        </StyledSignUpMainSignUp>
      </StyledSignUpPage>
    </>
  );
};

export default SignIn;
