import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ isOpen }) => (isOpen ? '#1C1C1C' : '')};
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: ${({ isOpen }) => (isOpen ? '24px 16px' : '0 16px')};
`;
export const AccordionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  cursor: pointer;
`;
export const Question = styled.p`
  margin: 0%;
  font-size: 16px;

  /* mobile Styles */
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
export const AnswerContainer = styled.div``;
export const ArrowToggle = styled.img`
  width: 24px;
  height: 24px;
`;
export const Answer = styled.p`
  margin: 0%;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;

  /* mobile Styles */
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
