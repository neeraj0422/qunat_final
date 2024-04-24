import { StyledFormTitle } from '../../Styles/Components/Common';
import FormInputLabel from '../Common/Form/FormInputLabel';
import show from '../../Assets/signUp/show.png';
import hide from '../../Assets/signUp/hide.png';
import FormButton from '../Common/Form/FormButton';
import { Link, useNavigate } from 'react-router-dom';
// import googleLogo from '../../Assets/signUp/google-logo.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { auth, fetchToken } from '../../firebase';
// import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import apiRequest from '../../api/api';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Access the current user data directly
      const currentUser = result.user;

      const userData = {
        email: currentUser.email
      };

      const { response, responseData } = await apiRequest('api/v1/google-signin', 'POST', userData);
      if (response.ok) {
        const authToken = responseData?.meta?.token;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('isVerified', 1);

        toast.success('Login successful');

        await fetchToken(setTokenFound, authToken);
        navigate('/');
      } else {
        console.log(isTokenFound);
        toast.error(`${responseData?.meta?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(error)
    
    ;
      
    }
  };

  const handleSignIn = async (data) => {
    try {
      const response = await fetch(`https://qunat-final-1.onrender.com/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 6024
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (responseData.meta.status === 200) {
        const authToken = responseData?.meta?.token;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('isVerified', Number(responseData?.data?.is_email_verified));
        navigate('/');
        toast.success('Login success');
        await fetchToken(setTokenFound, authToken);
      } else {
        toast.error(`Login failed: ${responseData?.meta?.message}`);
      }
    } catch (error) {
      toast.error('An error occurred during login', error);
    }
  };

  const validateWhitespace = (value) => {
    return value.trim().length > 0;
  };
  return (
    <>
      <div className="signUp-form-container">
        <div className="signUp-form-welcome">
          <StyledFormTitle>Log In</StyledFormTitle>
          <form className="signup-form-main">
            <div className="signup-form-main-inputs">
              <div className="d-flex flex-column gap-3">
                <FormInputLabel
                  label="Email"
                  placeholder="john@email.com"
                  name="email"
                  register={register}
                  errors={errors}
                  pattern={/^[^\s@]+@[A-Za-z]+\.[A-Za-z]{2,}$/i}
                  validate={{
                    noWhitespace: validateWhitespace
                  }}
                />
                <div className="position-relative">
                  <FormInputLabel
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    inputClassName="pe-40"
                    name="password"
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
              </div>
              <FormButton
                type="submit"
                onClick={handleSubmit(handleSignIn)}
                // onSubmit={handleSubmit(handleSignIn)}
              >
                Continue
              </FormButton>

              <div className="signup-form-main-other">
                <div className="other-already">
                  Don’t have an account?
                  <Link to="/sign-up">
                    <b> Signup</b>
                  </Link>
                </div>
                <div className="other-already">
                  or
                  <Link to="/forget-password">
                    <b> Forgot </b>
                    Password ?
                  </Link>
                </div>
                <div className="other-or">or</div>
                <div
                  className="other-google"
                  // onClick={() => {
                  //   handleGoogleSignIn();
                  // }}
                >
                  {/* <img src={googleLogo} alt="google-logo" className="me-2" />
                  Signin with Google */}

                  <button className="gsi-material-button" onClick={handleGoogleSignIn}>
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
                      <span className="gsi-material-button-contents">Sign in with Google</span>
                      <span style={{ display: 'none' }}>Sign in with Google</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
