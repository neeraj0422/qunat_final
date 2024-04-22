import { StyledFormInput, StyledFormLabel } from '../../../Styles/Components/Common';

const FormInputLabel = ({
  inputClassName,
  label,
  type,
  placeholder,
  name,
  register,
  errors,
  pattern,
  validate
}) => {
  return (
    <div className="label-field">
      <StyledFormLabel>{label}</StyledFormLabel>
      <StyledFormInput
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: `${label} is required`,
          pattern: {
            value: pattern,
            message: `Please enter a valid ${label.toLowerCase()}`
          },
          validate: validate
        })}
      />
      {errors[name] && <div className="text-danger">{errors[name].message}</div>}
    </div>
  );
};

export default FormInputLabel;
