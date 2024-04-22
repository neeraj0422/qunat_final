import { StyledMainSignInUp } from '../../Styles/Components/MainSignUp';
import SignInUpImageContainer from './SignUpImageContainer';
import SignUpFormContainer from './SignUpForm/SignUpFormContainer';

const MainSignUp = ({ currentStep, onSubmit, onBack, phoneNumber }) => {
  return (
    <StyledMainSignInUp>
      <div className="signup-wrapper">
        <SignUpFormContainer
          currentStep={currentStep}
          phoneNumber={phoneNumber}
          onSubmit={onSubmit}
          onBack={onBack}
        />
        <SignInUpImageContainer />
      </div>
    </StyledMainSignInUp>
  );
};

export default MainSignUp;
