import {
  StyledFormInput,
  StyledFormLabel,
  StyledFormSelect,
  StyledFormTitle
} from '../../../Styles/Components/Common';
import FormButton from '../../Common/Form/FormButton';
import data from '../../../Json/countryPhoneCodes.json';
import BackArrow from '../../Common/BackArrow/BackArrow';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import apiRequest from '../../../api/api';

const SignUpFormNumber = ({ onBack, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleSignUp = async (data) => {
    const { response, responseData, error } = await apiRequest('api/v1/send-otp', 'POST', data);

    if (!error) {
      if (response.ok) {
        onSubmit(data.country_code + data.mobile_number);
        toast.success('OTP sent successfully');
      } else {
        toast.error(`Failed to send OTP: ${responseData?.meta?.message || 'Unknown error'}`);
      }
    } else {
      toast.error('An error occurred during the send otp process', error);
    }
  };

  return (
    <form className="signUp-form-dob" onSubmit={handleSubmit(handleSignUp)}>
      <div>
        <BackArrow onClick={onBack} />

        <StyledFormTitle className="my-2">
          Enter your phone number for secure account
        </StyledFormTitle>
        <div className="label-field">
          <StyledFormLabel>Mobile Number</StyledFormLabel>
          <div className="d-flex gap-3">
            <StyledFormSelect
              className="w-25 p-1"
              {...register('country_code', {
                required: { value: true, message: 'Select country code' }
              })}
            >
              <option value="" hidden>
                Select
              </option>
              {data.map((country) => {
                return (
                  <option key={country.code} value={`+${country.code}`}>
                    <span>+{country.code}</span>
                    <span> {country.iso} </span>
                  </option>
                );
              })}
            </StyledFormSelect>
            <StyledFormInput
              className="w-100"
              type="text"
              placeholder="Enter your number"
              maxLength="10"
              {...register('mobile_number', {
                required: { value: true, message: 'Country code & Mobile number is required' }
              })}
            />
          </div>
          <div className="d-flex gap-3">
            {errors.mobile_number && (
              <div className="text-danger">{errors.mobile_number.message}</div>
            )}
          </div>
        </div>
      </div>

      <FormButton type="submit">Get OTP</FormButton>
    </form>
  );
};

export default SignUpFormNumber;
