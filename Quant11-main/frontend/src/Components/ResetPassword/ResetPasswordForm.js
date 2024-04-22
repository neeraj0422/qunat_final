import { StyledFormTitle } from '../../Styles/Components/Common';
import FormInputLabel from '../Common/Form/FormInputLabel';
import FormButton from '../Common/Form/FormButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import apiRequest from '../../api/api';
import { useState } from 'react';
import show from '../../Assets/signUp/show.png';
import hide from '../../Assets/signUp/hide.png';

const ResetPasswordForm = () => {
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  // Separate state for new password and confirm password
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = (type) => {
    if (type === 'new') {
      setShowNewPassword((prev) => !prev);
    } else if (type === 'confirm') {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const handleResetPassword = async (data) => {
    const resetData = {
      password: data.password,
      confirm_password: data.confirm_password,
      token: token
    };

    const { response, responseData, error } = await apiRequest(
      'api/v1/reset-password',
      'POST',
      resetData
    );
    if (!error) {
      if (response.ok) {
        toast.success(responseData.meta.message);
        navigate('/sign-in');
      } else {
        toast.error(`Reset password failed: ${responseData?.meta?.message || 'Unknown error'}`);
      }
    } else {
      toast.error('An error occurred while reseting password', error);
    }
  };

  return (
    <>
      <div className="signUp-form-container">
        <div className="signUp-form-welcome">
          <StyledFormTitle>Reset Password</StyledFormTitle>
          <form className="signup-form-main" onSubmit={handleSubmit(handleResetPassword)}>
            <div className="signup-form-main-inputs">
              <div className="d-flex flex-column gap-3">
                <div className="position-relative">
                  <FormInputLabel
                    label="New password"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="********"
                    inputClassName="pe-40"
                    name="password" // Unique name for new password
                    register={register}
                    errors={errors}
                  />
                  <div className="position-absolute" style={{ top: '42px', right: '10px' }}>
                    <img
                      src={showNewPassword ? show : hide}
                      alt={showNewPassword ? 'open-eye' : 'close-eye'}
                      className="eye-img"
                      onClick={() => togglePassword('new')}
                    />
                  </div>
                </div>
                <div className="position-relative">
                  <FormInputLabel
                    label="Confirm password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="********"
                    inputClassName="pe-40"
                    name="confirm_password" // Unique name for confirm password
                    register={register}
                    errors={errors}
                  />
                  <div className="position-absolute" style={{ top: '42px', right: '10px' }}>
                    <img
                      src={showConfirmPassword ? show : hide}
                      alt={showConfirmPassword ? 'open-eye' : 'close-eye'}
                      className="eye-img"
                      onClick={() => togglePassword('confirm')}
                    />
                  </div>
                </div>
              </div>
              <FormButton type="submit">Continue</FormButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
