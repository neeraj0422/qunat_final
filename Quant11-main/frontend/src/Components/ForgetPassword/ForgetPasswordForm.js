import { StyledFormTitle } from '../../Styles/Components/Common';
import FormInputLabel from '../Common/Form/FormInputLabel';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import apiRequest from '../../api/api';
import { useState } from 'react';

const ForgetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [disable, setDisable] = useState(false);

  const handleForgetPassword = async (data) => {
    setDisable(true);
    const { response, responseData, error } = await apiRequest(
      'api/v1/forget-password',
      'POST',
      data
    );

    if (!error) {
      setDisable(false);
      if (response.ok) {
        toast.success(responseData.meta.message);
      } else {
        toast.error(`Forget password failed: ${responseData?.meta?.message || 'Unknown error'}`);
      }
    } else {
      setDisable(false);
      toast.error('An error occurred while forgetting password', error);
    }
  };

  const validateWhitespace = (value) => {
    return value.trim().length > 0;
  };

  return (
    <>
      <div className="signUp-form-container">
        <div className="signUp-form-welcome">
          <StyledFormTitle>Forget Password</StyledFormTitle>
          <form className="signup-form-main" onSubmit={handleSubmit(handleForgetPassword)}>
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
              </div>

              <button
                disabled={disable}
                style={{
                  display: 'flex',
                  marginTop: '20px',
                  padding: '14px 60px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  background:
                    'linear-gradient(0deg, rgba(199, 215, 248, 0.14) 0%, rgba(199, 215, 248, 0.14) 100%), #121212'
                }}>
                Continue
              </button>

              <div className="signup-form-main-other">
                <div className="other-already">
                  Or
                  <Link to="/sign-in">
                    <b> Sign In ?</b>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordForm;
