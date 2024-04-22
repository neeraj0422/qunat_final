import { StyledFormButton } from '../../../Styles/Components/Common';

const FormButton = ({ type, children, onClick, disabled }) => {
  return (
    <StyledFormButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledFormButton>
  );
};

export default FormButton;
