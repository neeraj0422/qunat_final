import { StyledMainSignInUp } from '../../Styles/Components/MainSignUp';
import SignInUpImageContainer from '../SignUp/SignUpImageContainer';
import ResetPasswordForm from './ResetPasswordForm';

const MainResetPassword = () => {
  return (
    <StyledMainSignInUp style={{ width: '64%' }}>
      <div className="signup-wrapper">
        <ResetPasswordForm />
        <SignInUpImageContainer />
      </div>
    </StyledMainSignInUp>
  );
};

export default MainResetPassword;
