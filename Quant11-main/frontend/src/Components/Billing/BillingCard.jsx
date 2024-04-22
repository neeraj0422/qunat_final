import React from 'react';
import {
  Algo,
  BillingHeader,
  Box,
  Button,
  ButtonSection,
  CardContainer,
  CheckIcon,
  Feature,
  FeatureContainer,
  PlanName,
  PlanPrice
} from '../../Styles/Components/BillingCardstyle';

const BillingCard = ({ plan_price, plan_name, algo, features, Check }) => {
  return (
    <CardContainer>
      <BillingHeader>
        <PlanPrice>{plan_price}</PlanPrice>
        <PlanName>{plan_name}</PlanName>
        <Algo>{algo}</Algo>
      </BillingHeader>
      <Box>
        {features.map((featureData, i) => (
          <FeatureContainer key={i}>
            <CheckIcon src={Check} />
            <Feature>{featureData}</Feature>
          </FeatureContainer>
        ))}
      </Box>
      <ButtonSection>
        <Button>Get Start</Button>
      </ButtonSection>
    </CardContainer>
  );
};

export default BillingCard;
