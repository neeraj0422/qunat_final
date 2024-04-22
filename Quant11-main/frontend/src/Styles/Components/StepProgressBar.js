import styled from 'styled-components';

export const StyledStepProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px auto;
  position: relative;
  width: 75%;

  &:before {
    content: '';
    position: absolute;
    background: #efe6fd;
    height: 6px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  &:after {
    content: '';
    position: absolute;
    background: #6002ee;
    height: 6px;
    width: ${(props) => (props.currentStep / 3) * 100}%;
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;
