import React from 'react';
import {
  Container,
  Desc,
  HeaderBox,
  MainContainer,
  PlanContainer,
  Title
} from '../../Styles/Pages/BillingPageStyle';
import BillingCard from '../../Components/Billing/BillingCard';
import Check from '../../Assets/billing/Check.svg';

const Billing = () => {
  const billingData = [
    {
      plan_price: 'Free',
      plan_name: 'Free Plan',
      algo: '1 Strategy to follow',
      features: ['Access of open trades of 1 followed strategy', 'Basic Support - Support Ticket']
    },
    {
      plan_price: '$9/month',
      plan_name: 'Essential Plan',
      algo: '4 Strategies to follow',
      features: ['Access to all basic features', 'Basic Support - Support Ticket']
    },
    {
      plan_price: '$22/month',
      plan_name: 'Plus Plan',
      algo: '10 Strategies to follow',
      features: [
        'Access to all basic features',
        'SMS + Email Notifications',
        'Plus Support - Email/Support Ticket'
      ]
    },
    {
      plan_price: '$49/month',
      plan_name: 'Premium Plan',
      algo: 'All Strategies to follow',
      features: [
        'Access to all basic features',
        'All Strategies to follow and see all open trades',
        'SMS + Email Notifications',
        'Premium Support - Live chat/Email/Support Ticket'
      ]
    }
  ];

  return (
    <MainContainer>
      <Container>
        <HeaderBox>
          <Title>Choose plan</Title>
          <Desc>We offer flexible pricing plans designed to meet your needs</Desc>
        </HeaderBox>
        <PlanContainer>
          {billingData.map((data, i) => (
            <React.Fragment key={i}>
              <BillingCard {...data} Check={Check} />
            </React.Fragment>
          ))}
        </PlanContainer>
      </Container>
    </MainContainer>
  );
};

export default Billing;
