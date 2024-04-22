import { StyledMainSignInUp } from '../../Styles/Components/MainSignUp';
import SignInUpImageContainer from '../SignUp/SignUpImageContainer';
import SignInForm from './SignInForm';

const MainSignIn = () => {
  return (
    <StyledMainSignInUp style={{ width: '68%' }}>
      <div className="signup-wrapper">
        <SignInForm />
        <SignInUpImageContainer />
      </div>
    </StyledMainSignInUp>
  );
};

export default MainSignIn;
