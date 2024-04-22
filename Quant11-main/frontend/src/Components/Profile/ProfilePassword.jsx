import React, { useState } from 'react';
import {
  Button,
  Desc,
  EditPasswordContainer,
  ErrorText,
  EyeIcon,
  EyeStatus,
  Field,
  FieldInput,
  FieldName,
  Heading,
  PasswordBox,
  PasswordContainer,
  TextBox
} from '../../Styles/Components/ProfilePassword.Style';
import show from '../../Assets/signUp/show.png';
import hide from '../../Assets/signUp/hide.png';
import { toast } from 'react-toastify';
import apiRequest from '../../api/api';

const ProfilePassword = () => {
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    password: '',
    confirm_password: ''
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Reset errors on input change
    setPasswordError('');
    setConfirmPasswordError('');
    setOldPasswordError('');
  };

  const validatePassword = () => {
    const { old_password, password, confirm_password } = passwordData;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;

    if (!passwordRegex.test(old_password)) {
      setOldPasswordError(
        'Old password must be 6 or more characters, include at least 1 capital letter, and 1 numeric digit'
      );
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be 6 or more characters, include at least 1 capital letter, 1 numeric digit, and 1 special character (!@#$%^&*)'
      );
      return false;
    }

    if (password !== confirm_password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validatePassword()) {
      const { response, responseData, error } = await apiRequest(
        `api/v1/change-password`,
        'POST',
        passwordData
      );

      if (!error) {
        if (response.ok) {
          toast.success(responseData.meta.message);
        } else {
          toast.error(`Password update failed: ${responseData?.meta?.message || 'Unknown error'}`);
        }
      } else {
        toast.error('An error occurred while updating password', error);
      }
      setPasswordData({
        old_password: '',
        password: '',
        confirm_password: ''
      });
    }
  };

  return (
    <PasswordContainer>
      <TextBox>
        <Heading>Please input a secure and memorable password.</Heading>
        <Desc>
          It is important to change your password frequently and keep it private since anybody who
          knows your password may access your account.
        </Desc>
      </TextBox>

      <EditPasswordContainer>
        <Field>
          <FieldName>Current password</FieldName>
          <div className="text-danger" style={{ position: 'relative', width: '70%' }}>
            <PasswordBox>
              <FieldInput
                type={showOldPassword ? 'text' : 'password'}
                name="old_password"
                placeholder="Enter Current password"
                value={passwordData.old_password}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
              <EyeIcon onClick={() => setShowOldPassword((prev) => !prev)}>
                {showOldPassword ? <EyeStatus src={hide} /> : <EyeStatus src={show} />}
              </EyeIcon>
            </PasswordBox>
            {oldPasswordError && <ErrorText>{oldPasswordError}</ErrorText>}
          </div>
        </Field>

        <Field>
          <FieldName>New password</FieldName>
          <div className="text-danger" style={{ position: 'relative', width: '70%' }}>
            <PasswordBox>
              <FieldInput
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter New password"
                value={passwordData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
              <EyeIcon onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeStatus src={hide} /> : <EyeStatus src={show} />}
              </EyeIcon>
            </PasswordBox>
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
          </div>
        </Field>

        <Field>
          <FieldName>Confirm password</FieldName>
          <div className="text-danger" style={{ position: 'relative', width: '70%' }}>
            <PasswordBox>
              <FieldInput
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirm_password"
                placeholder="Enter Confirm password"
                value={passwordData.confirm_password}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
              <EyeIcon onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <EyeStatus src={hide} /> : <EyeStatus src={show} />}
              </EyeIcon>
            </PasswordBox>
            {confirmPasswordError && <ErrorText>{confirmPasswordError}</ErrorText>}
          </div>
        </Field>
        {/* {confirmPasswordError && <ErrorText>{confirmPasswordError}</ErrorText>} */}
        {/* {confirmPasswordError && <div className="text-danger">{confirmPasswordError}</div>} */}
      </EditPasswordContainer>
      <Button onClick={handleSubmit}>Save</Button>
    </PasswordContainer>
  );
};

export default ProfilePassword;
