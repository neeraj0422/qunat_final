import { StyledFormTitle } from '../../../Styles/Components/Common';
import FormInputLabel from '../../Common/Form/FormInputLabel';
import FormButton from '../../Common/Form/FormButton';
import BackArrow from '../../Common/BackArrow/BackArrow';

const SignUpFormEmail = () => {
  return (
    <div className="signUp-form-email">
      <BackArrow />
      <StyledFormTitle>What is your email address?</StyledFormTitle>
      <div className="signup-form-main">
        <div className="signup-form-main-inputs">
          <FormInputLabel
            label="Email"
            type="email"
            placeholder="john@email.com"
            // value=""
            name="email"
          />
          <FormInputLabel
            label="Create password"
            type="password"
            placeholder="******"
            // value=""
            name="lastName"
          />
          <FormInputLabel
            label="Confirm password"
            type="password"
            placeholder="******"
            // value=""
            name="lastName"
          />
        </div>
        <FormButton>Next</FormButton>
      </div>
    </div>
  );
};

export default SignUpFormEmail;
