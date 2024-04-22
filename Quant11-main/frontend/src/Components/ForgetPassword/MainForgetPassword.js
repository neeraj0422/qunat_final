import { StyledMainSignInUp } from '../../Styles/Components/MainSignUp';
import SignInUpImageContainer from '../SignUp/SignUpImageContainer';
import ForgetPasswordForm from './ForgetPasswordForm';

const MainForgetPassword = () => {
  return (
    <StyledMainSignInUp style={{ width: '64%' }}>
      <div className="signup-wrapper">
        <ForgetPasswordForm />
        <SignInUpImageContainer />
      </div>
    </StyledMainSignInUp>
  );
};

export default MainForgetPassword;
