// Support.js
import React from 'react';
import { MainContainer } from '../../Styles/Components/GlobalDashboard';
import FAQAccordion from '../../Components/Support/FAQAccordion'; // Import the FAQAccordion component
import {
  Contact,
  ContactCard,
  ContactIcon,
  Container,
  Desc,
  InfoContainer,
  Title,
  ContactIconContainer,
  ContactCardContainer,
  Heading,
  FAQContainer
} from '../../Styles/Pages/Support';

import call_icon from '../../Assets/Support/call_icon.svg';
import email_icon from '../../Assets/Support/email_icon.svg';

const Support = () => {
  const faqData = [
    {
      question: '1. What is algorithmic trading?',
      answer:
        'Algorithmic trading, or algo trading, is the use of computer algorithms to execute trading strategies automatically. Our app employs advanced algorithms to make data-driven decisions and execute trades on your behalf.'
    },
    {
      question: '2. How do I personalize my trading signals?',
      answer:
      'You can personalize your trading signals by setting specific parameters such as preferred assets, risk tolerance, and desired trading frequency within the app. This customization allows you to tailor the signals to align with your investment goals.'
    },
    {
      question: '3. Can I receive real-time alerts for trading signals?',
      answer:
      'Yes, our platform provides real-time alerts for trading signals. You will receive instant notifications based on the criteria of trading strategy.'
    },
    {
      question: '4. Is my financial information secure?',
      answer:
      'Ensuring the security of your financial information is our top priority'    },
    {
      question: '5. How can I get in touch with customer support?',
      answer:
      'You can reach our customer support team through multiple channels, including email or phone.'
    }
  ];

  return (
    <MainContainer>
      <Container>
        <Title>Support</Title>
        <ContactCardContainer>
          <ContactCard>
            <ContactIconContainer>
              <ContactIcon src={call_icon} />
            </ContactIconContainer>
            <InfoContainer>
              <Desc>Customer services</Desc>
              <Contact>81929 03877</Contact>
            </InfoContainer>
          </ContactCard>
          <ContactCard>
            <ContactIconContainer>
              <ContactIcon src={email_icon} />
            </ContactIconContainer>
            <InfoContainer>
              <Desc>Write us at</Desc>
              <Contact>support@quant11.com</Contact>
            </InfoContainer>
          </ContactCard>
        </ContactCardContainer>

        <Heading>FAQ about Stocks</Heading>

        <FAQContainer>
          {faqData.map((faq, index) => (
            <FAQAccordion key={index} faq={faq} />
          ))}
        </FAQContainer>
      </Container>
    </MainContainer>
  );
};

export default Support;
