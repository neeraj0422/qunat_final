// FAQAccordion.js
import React, { useState } from 'react';
import {
  AccordionContainer,
  Answer,
  AnswerContainer,
  ArrowToggle,
  Container,
  Question
} from '../../Styles/Components/FAQAccordionStyle';
import Down_Arrow from '../../Assets/Support/Down_Arrow.svg';
import Right_Arrow from '../../Assets/Support/Right_Arrow.svg';

const FAQAccordion = ({ faq }) => {
  if (!faq) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container isOpen={isOpen}>
      <AccordionContainer onClick={toggleAccordion}>
        <Question>{faq.question}</Question>
        <ArrowToggle src={isOpen ? Down_Arrow : Right_Arrow} />
      </AccordionContainer>
      {isOpen && (
        <AnswerContainer>
          <Answer>{faq.answer}</Answer>
        </AnswerContainer>
      )}
    </Container>
  );
};

export default FAQAccordion;
