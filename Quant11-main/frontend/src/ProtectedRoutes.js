import { Navigate } from 'react-router-dom';
import { PageLayout } from './Components/PageLayout';
// import { StyledMainSignInUp } from './Styles/Components/MainSignUp';
// import { StyledSignUpMainSignUp } from './Styles/Pages/SignUp';
// import SignInUpImageContainer from './Components/SignUp/SignUpImageContainer';

export const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem('authToken');
  const isVerified = localStorage.getItem('isVerified');
  if (!token) {
    return <Navigate to="/sign-in" />;
  }
  // return <PageLayout>{children}</PageLayout>;
  else {
    if (!isVerified || isVerified === '0') {
      return <Navigate to="/sign-up" replace={true} state={{ currentStep: 2 }} />;
    }
    return <PageLayout>{children}</PageLayout>;
  }
};
export const PartiallyProtectedRoutes = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/sign-up" />;
  } else {
    return (
      // <StyledSignUpMainSignUp className="container">
      //   <StyledMainSignInUp>
      //     <div className="signup-wrapper">
      //       <div className="signUp-form-container">{children}</div>
      //       <SignInUpImageContainer />
      //     </div>
      //   </StyledMainSignInUp>
      // </StyledSignUpMainSignUp>
      <Navigate to="/sign-up" replace={true} state={{ currentStep: 3 }} />
    );
  }
};
