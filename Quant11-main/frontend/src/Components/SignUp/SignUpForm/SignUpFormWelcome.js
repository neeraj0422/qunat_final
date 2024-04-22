// import googleLogo from '../../../Assets/signUp/google-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  StyledFormLabel,
  StyledFormSelect,
  StyledFormTitle
} from '../../../Styles/Components/Common';
import FormInputLabel from '../../Common/Form/FormInputLabel';
import FormButton from '../../Common/Form/FormButton';
import { useState } from 'react';
import hide from '../../../Assets/signUp/hide.png';
import show from '../../../Assets/signUp/show.png';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import countriesData from '../../../Json/countryPhoneCodes.json';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, fetchToken } from '../../../firebase';
import apiRequest from '../../../api/api';
import {
  StyledNumberInput,
  StyledSelect,
  StyledSignupMobile,
  StyledSignupMobileContainer,
  StyledSignupMobileMainContainer
} from '../../../Styles/Pages/SignUp';
import { Checkbox } from '../../../Styles/Components/EditProfileStyle';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const SignUpFormWelcome = ({ onSubmit }) => {
  const [dateValue, setDateValue] = useState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const fireTermsAlert = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Terms & conditions',

      // text:'',
      html: `
    <div style="text-align: left;">
      <p>
        Welcome to our website. By accessing and using this website, you accept and agree to be bound by the terms and conditions set forth below.
      </p>
      <p>
        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p>
        2. Nulla facilisi. Curabitur euismod dapibus orci, et scelerisque libero tincidunt ut.
      </p>
      <p>
        3. Suspendisse potenti. Duis vestibulum vestibulum metus, a ullamcorper nulla mattis eu.
      </p>
      <!-- Add more terms as needed -->
    </div>
  `,
      icon: 'info',
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      padding: '1rem',
      color: '#716add',
      background: '#202224',
      customClass: {
        title: 'custom-title-class', // Specify a custom class for the title
        htmlContainer: 'custom-html-container-class', // Specify a custom class for the entire content container (optional)
        popup: 'custom-popup-class' // Specify a custom class for the entire popup (optional)
      }
    });
  };
  const firePrivacyAlert = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Privacy Policy',
      // text:'',
      html: `
    <div style="text-align: left;">
      <p>
        Welcome to our website. By accessing and using this website, you accept and agree to be bound by the terms and conditions set forth below.
      </p>
      <p>
        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p>
        2. Nulla facilisi. Curabitur euismod dapibus orci, et scelerisque libero tincidunt ut.
      </p>
      <p>
        3. Suspendisse potenti. Duis vestibulum vestibulum metus, a ullamcorper nulla mattis eu.
      </p>
      <!-- Add more terms as needed -->
    </div>
  `,
      icon: 'info',
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      padding: '1rem',
      color: '#716add',
      background: '#202224',
      customClass: {
        title: 'custom-title-class', // Specify a custom class for the title
        htmlContainer: 'custom-html-container-class', // Specify a custom class for the entire content container (optional)
        popup: 'custom-popup-class' // Specify a custom class for the entire popup (optional)
      }
    });
  };

  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked);
  };

  const handleSignUp = async (data) => {
    try {
      if (!dateValue) {
        return;
      }
      const formattedDate = moment(dateValue).format('DD/MM/yyyy');
      data.date_of_birth = formattedDate;

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}api/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 6024
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (response.ok) {
        onSubmit();
        const authToken = responseData?.meta?.token;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('isVerified', Number(responseData?.data?.is_email_verified));
        toast.success('Email register Successfully');
        await fetchToken(setTokenFound, authToken);
      } else {
        console.log(isTokenFound);
        toast.error(`${responseData?.meta?.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('An error occurred during Email register', error);
    }
  };

  async function handleGoogleSignup(e) {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Access the current user data directly
    const currentUser = result.user;

    const fullName = currentUser.displayName.split(' ');
    const userData = {
      email: currentUser.email,
      first_name: fullName[0],
      last_name: fullName[1],
      is_email_verified: 1
    };

    const { response, responseData } = await apiRequest('api/v1/google-signup', 'POST', userData);

    if (response.ok) {
      const authToken = responseData?.meta?.token;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('isVerified', 1);

      // await fetchToken(setTokenFound, authToken);
      navigate('/user-experience');
      toast.success('Google sign-up Successfully');
    } else {
      toast.error(`Google sign-up failed: ${responseData?.meta?.message || 'Unknown error'}`);
    }
  }

  return (
    <div className="signUp-form-welcome">
      <StyledFormTitle>Welcome, Signup to continue</StyledFormTitle>
      <form className="signup-form-main">
        <div className="signup-form-main-inputs">
          <div className="d-flex flex-column flex-md-row gap-3">
            <FormInputLabel
              label="First Name"
              placeholder="First Name"
              name="first_name"
              register={register}
              errors={errors}
            />
            <FormInputLabel
              label="Last Name"
              placeholder="Last Name"
              name="last_name"
              register={register}
              errors={errors}
            />
          </div>
          <FormInputLabel
            label="Email"
            placeholder="john@email.com"
            name="email"
            register={register}
            errors={errors}
            pattern={/^[^\s@]+@[A-Za-z]+\.[A-Za-z]{2,}$/i}
          />

          <StyledSignupMobileMainContainer>
            <StyledSignupMobileContainer>
              <StyledFormLabel>Country code</StyledFormLabel>
              <StyledSelect {...register('country_code')}>
                <option value="" hidden>
                  Code
                </option>
                {countriesData.map((data) => (
                  <option key={data.code} value={data.code}>
                    {'+' + data.code + '--' + data.country}
                  </option>
                ))}
              </StyledSelect>
              {errors['country_code'] && (
                <div className="text-danger">{errors['country_code'].message}</div>
              )}
            </StyledSignupMobileContainer>
            <StyledSignupMobile>
              <StyledFormLabel>Mobile number</StyledFormLabel>
              <StyledNumberInput
                type="number"
                inputMode="numeric"
                placeholder="enter number"
                errors={errors}
                {...register('mobile_number', {})}
              />
              {errors['mobile_number'] && (
                <div className="text-danger">{errors['mobile_number'].message}</div>
              )}
            </StyledSignupMobile>
          </StyledSignupMobileMainContainer>

          <div className="d-flex flex-column flex-md-row gap-3">
            <div className="label-field w-100">
              <StyledFormLabel>Resident country</StyledFormLabel>
              <StyledFormSelect
                {...register('country', {
                  required: { value: true, message: 'Country is required' }
                })}>
                <option value="" hidden>
                  Select country
                </option>
                {countriesData.map((data) => (
                  <option key={data.iso} value={data.country}>
                    {data.country}
                  </option>
                ))}
              </StyledFormSelect>
              {errors.country && <div className="text-danger">{errors.country.message}</div>}
            </div>
            <div className="label-field w-100">
              <StyledFormLabel>Date of Birth</StyledFormLabel>
              <Controller
                control={control}
                name="date_of_birth"
                render={({ field }) => (
                  <DatePicker
                    value={dateValue}
                    format="MM/dd/yyyy"
                    maxDate={new Date()}
                    onChange={(e) => {
                      setDateValue(e);
                      field.onChange(e);
                    }}
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYYY"
                  />
                )}
                rules={{
                  required: `Date of Birth field is required`
                }}
              />

              {errors.date_of_birth && (
                <div className="text-danger">{errors.date_of_birth.message}</div>
              )}
              {/*<FormInputLabel*/}
              {/*  label="Date of Birth"*/}
              {/*  placeholder="dd/mm/yyyy"*/}
              {/*  name="date_of_birth"*/}
              {/*  register={register}*/}
              {/*  errors={errors}*/}
              {/*/>*/}
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row gap-3">
            <div className="position-relative">
              <FormInputLabel
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                name="password"
                inputClassName="pe-40"
                register={register}
                errors={errors}
              />
              <div className="position-absolute" style={{ top: '42px', right: '10px' }}>
                <img
                  src={showPassword ? show : hide}
                  alt={showPassword ? 'open-eye' : 'close-eye'}
                  className="eye-img"
                  onClick={togglePassword}
                />
              </div>
            </div>
            <div className="position-relative">
              <FormInputLabel
                label="Confirm password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="********"
                name="confirm_password"
                inputClassName="pe-40"
                register={register}
                errors={errors}
              />
              <div className="position-absolute" style={{ top: '42px', right: '10px' }}>
                <img
                  src={showConfirmPassword ? show : hide}
                  alt={showConfirmPassword ? 'open-eye' : 'close-eye'}
                  className="eye-img"
                  onClick={toggleConfirmPassword}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
            <Checkbox
              type="checkbox"
              name="receive_newsletter"
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
              style={{ marginTop: '6px' }}
            />
            <p>
              By clicking “Continue”, you agree to the{' '}
              <button
                onClick={fireTermsAlert}
                style={{
                  color: '#6002EE',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: '0px solid transparent'
                }}>
                <b>
                  {' '}
                  <u>Terms </u>{' '}
                </b>
              </button>{' '}
              and acknowledge the{' '}
              <button
                onClick={firePrivacyAlert}
                style={{
                  color: '#6002EE',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: '0px solid transparent'
                }}>
                {''}
                <b>
                  {' '}
                  <u>Privacy Policy</u>
                </b>
              </button>
            </p>
          </div>
        </div>

        <FormButton onClick={handleSubmit(handleSignUp)} disabled={!isCheckboxChecked}>
          Continue
        </FormButton>

        <div className="signup-form-main-other">
          <div className="other-already">
            Already have an account?
            <Link to="/sign-in">
              <b> Signin</b>
            </Link>
          </div>
          <div className="other-or">or</div>
          <div className="other-google">
            {/* <img src={googleLogo} alt="google-logo" className="me-2" />
            Signup with Google */}
            <button className="gsi-material-button" onClick={handleGoogleSignup}>
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{ display: 'block' }}>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents">Sign up with Google</span>
                <span style={{ display: 'none' }}>Sign up with Google</span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpFormWelcome;
