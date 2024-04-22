import { StyledFormTitle, StyledOtpInput } from '../../../Styles/Components/Common';
import FormButton from '../../Common/Form/FormButton';
import BackArrow from '../../Common/BackArrow/BackArrow';
import { useForm } from 'react-hook-form';
import apiRequest from '../../../api/api';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';

const SignUpFormOtp = ({ onBack, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();
  const otpBoxReference = useRef([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchEmail() {
      try {
        const { responseData } = await apiRequest(`api/v1/user-details`, 'GET');
        if (responseData.meta.status === 200) {
          setEmail(responseData.data.email);
        }
      } catch (error) {
        toast.error('An error occurred during login', error);
      }
    }
    fetchEmail();
  }, []);

  const handleChange = (value, index) => {
    let newArr = value.split('');
    newArr.forEach((digit, i) => setValue(`otp${index + i + 1}`, digit));

    if (value && index < 3) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleBackspaceAndEnter = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === 'Enter' && e.target.value && index < 3) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleSignUp = async (data) => {
    const enteredOTP = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`;

    const payload = {
      otp: enteredOTP
    };
    const { response, responseData, error } = await apiRequest(
      'api/v1/verify-otp',
      'POST',
      payload
    );
    if (!error) {
      if (response.ok) {
        onSubmit();
        localStorage.setItem('isVerified', 1);
        toast.success('OTP verified successfully');
      } else {
        toast.error(`Failed to verified OTP: ${responseData?.meta?.message || 'Unknown error'}`);
      }
    } else {
      toast.error('An error occurred during the verification process', error);
    }
  };

  const handleResendOtp = async () => {
    const { response, responseData, error } = await apiRequest('api/v1/resend-otp', 'GET', {});

    if (!error) {
      if (response.ok) {
        toast.success('OTP Resend');
      } else {
        toast.error(`Failed to resend OTP: ${responseData?.meta?.message || 'Unknown error'}`);
      }
    } else {
      toast.error('An error occurred during the resend otp', error);
    }
  };

  return (
    <form className="signUp-form-dob" onSubmit={handleSubmit(handleSignUp)}>
      <div>
        <BackArrow onClick={onBack} />
        <StyledFormTitle className="my-2">Verify your Email</StyledFormTitle>
        <p>
          Enter the verification code that we sent to <b> {email}</b>
        </p>
        <div className="label-field">
          <div className="d-flex justify-content-between align-items-center gap-3">
            {[1, 2, 3, 4].map((index) => (
              <StyledOtpInput
                key={index}
                type="text"
                maxLength="1"
                {...register(`otp${index}`, {
                  required: { value: true, message: 'Enter OTP' }
                })}
                onChange={(e) => handleChange(e.target.value, index - 1)}
                onKeyUp={(e) => handleBackspaceAndEnter(e, index - 1)}
                ref={(ref) => (otpBoxReference.current[index - 1] = ref)}
              />
            ))}
          </div>
          {errors.otp4 && <div className="text-danger">{errors.otp4.message}</div>}
          <div>
            Didn’t receive OTP?
            <b
              style={{ color: '#6002EE', cursor: 'pointer', marginLeft: '5px' }}
              onClick={handleResendOtp}>
              RESEND CODE
            </b>
          </div>
        </div>
      </div>

      <FormButton type="submit">Verify</FormButton>
    </form>
  );
};

export default SignUpFormOtp;
