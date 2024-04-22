import backArrow from '../../../Assets/signUp/back-arrow.png';
import styled from 'styled-components';

const StyledBackArrow = styled.section`
  margin-bottom: 16px;

  @media (max-width: 767px) {
    margin-bottom: 8px;
  }
`;

const BackArrow = ({ onClick }) => {
  return (
    <StyledBackArrow>
      <img src={backArrow} alt="back-arrow" onClick={onClick} />
    </StyledBackArrow>
  );
};

export default BackArrow;
