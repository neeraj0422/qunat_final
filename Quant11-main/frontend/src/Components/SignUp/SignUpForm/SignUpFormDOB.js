import { StyledFormTitle } from '../../../Styles/Components/Common';
import FormInputLabel from '../../Common/Form/FormInputLabel';
import FormButton from '../../Common/Form/FormButton';
import BackArrow from '../../Common/BackArrow/BackArrow';

const SignUpFormDOB = () => {
  return (
    <div className="signUp-form-dob">
      <div>
        <BackArrow />
        <StyledFormTitle>When were you born?</StyledFormTitle>
        <p>We use this to confirm your identity and age (18+)</p>
        <FormInputLabel label="Date of Birth" type="date" />
      </div>
      <FormButton>Next</FormButton>
    </div>
  );
};

export default SignUpFormDOB;
