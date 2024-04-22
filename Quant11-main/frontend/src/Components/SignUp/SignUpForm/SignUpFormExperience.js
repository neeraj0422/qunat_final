import BackArrow from '../../Common/BackArrow/BackArrow';
import FormButton from '../../Common/Form/FormButton';
import { StyledFormTitle } from '../../../Styles/Components/Common';
import { useForm } from 'react-hook-form';
import apiRequest from '../../../api/api';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useNavigate } from 'react-router-dom';

const SignUpFormExperience = ({ onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    const { response, responseData, error } = await apiRequest(
      'api/v1/risk-tolerance',
      'POST',
      data
    );

    if (!error) {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Profile created successfully',
          showCancelButton: false,
          confirmButtonText: 'Go to Dashboard'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to create profile',
          text: responseData?.meta?.message || 'Unknown error'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'An error occurred during the profile update',
        text: error
      });
    }
  };

  return (
    <form className="signUp-form-experience" onSubmit={handleSubmit(handleSignUp)}>
      <div className="risk-management">
        <BackArrow onClick={onBack} />

        <StyledFormTitle className="my-2">Risk Management</StyledFormTitle>
        <p>
          Understand your risk tolerance and investment preference to tailor your trading
          experience.
        </p>

        <div className="filter-experience">
          <div className="button ">
            <input
              type="radio"
              id="lowRisk"
              value="1"
              {...register('risk_appetite', {
                required: { value: true, message: 'Select at least one risk' }
              })}
            />
            <label className="btn btn-default risk-low" htmlFor="lowRisk">
              Low Risk
            </label>
          </div>
          <div className="button">
            <input
              type="radio"
              id="mediumRisk"
              value="2"
              {...register('risk_appetite', {
                required: { value: true, message: 'Select at least one risk' }
              })}
            />
            <label className="btn btn-default risk-medium" htmlFor="mediumRisk">
              Medium Risk
            </label>
          </div>
          <div className="button">
            <input
              type="radio"
              id="highRisk"
              value="3"
              {...register('risk_appetite', {
                required: { value: true, message: 'Select at least one risk' }
              })}
            />
            <label className="btn btn-default risk-high" htmlFor="mediumRisk">
              High Risk
            </label>
          </div>
        </div>
        {errors.risk_appetite && <div className="text-danger">{errors.risk_appetite.message}</div>}
      </div>

      <div className="experience">
        <StyledFormTitle className="my-3">
          How much experience do you have with investing?
        </StyledFormTitle>

        <div className="select-experience">
          <div className="filter-experience">
            <div className="button">
              <input
                type="radio"
                id="l1"
                value="1"
                {...register('trade_experience', {
                  required: { value: true, message: 'Select any experience' }
                })}
              />
              <label className="btn btn-default" htmlFor="l1">
                Less than 1 year
              </label>
            </div>
            <div className="button">
              <input
                type="radio"
                id="1t3"
                value="2"
                {...register('trade_experience', {
                  required: { value: true, message: 'Select any experience' }
                })}
              />
              <label className="btn btn-default" htmlFor="1t3">
                1-3 year
              </label>
            </div>
          </div>
          <div className="filter-experience">
            <div className="button">
              <input
                type="radio"
                id="3t5"
                value="3"
                {...register('trade_experience', {
                  required: { value: true, message: 'Select any experience' }
                })}
              />
              <label className="btn btn-default" htmlFor="3t5">
                3-5 year
              </label>
            </div>
            <div className="button">
              <input
                type="radio"
                id="5t10"
                value="4"
                {...register('trade_experience', {
                  required: { value: true, message: 'Select any experience' }
                })}
              />
              <label className="btn btn-default" htmlFor="5t10">
                5-10 year
              </label>
            </div>
          </div>
          <div className="filter-experience">
            <div className="button">
              <input
                type="radio"
                id="10t20"
                value="5"
                {...register('trade_experience', {
                  required: { value: true, message: 'Select any experience' }
                })}
              />
              <label className="btn btn-default" htmlFor="10t20">
                10-20 year
              </label>
            </div>
            <div className="button">
              <input
                type="radio"
                id="m20"
                value="6"
                {...register('trade_experience', {
                  required: { value: true, message: 'Select any experience' }
                })}
              />
              <label className="btn btn-default" htmlFor="m20">
                More than 20 year
              </label>
            </div>
          </div>
          {errors.trade_experience && (
            <div className="text-danger">{errors.trade_experience.message}</div>
          )}
        </div>
      </div>

      <FormButton type="submit">Next</FormButton>
    </form>
  );
};

export default SignUpFormExperience;
