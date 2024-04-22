import SignUpFormWelcome from './SignUpFormWelcome';
// import SignUpFormNumber from './SignUpFormNumber';
import SignUpFormOtp from './SignUpFormOTP';
import SignUpFormExperience from './SignUpFormExperience';

const SignUpFormContainer = ({ currentStep, onSubmit, onBack }) => {
  return (
    <div className="signUp-form-container">
      {currentStep === 1 && <SignUpFormWelcome onSubmit={onSubmit} />}
      {/* {currentStep === 2 && <SignUpFormNumber onSubmit={onSubmit} onBack={onBack} />} */}
      {currentStep === 2 && <SignUpFormOtp onSubmit={onSubmit} onBack={onBack} />}
      {currentStep === 3 && <SignUpFormExperience onBack={onBack} />}
    </div>
  );
};

export default SignUpFormContainer;
