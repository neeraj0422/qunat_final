import React from 'react';
import {
  ArrowImage,
  CardContainer,
  CardInnerContainer,
  DataContainer,
  Desc,
  // Ellipse,
  // EllipseImg,
  Lbox,
  RBox,
  Reactangle,
  Time,
  Title,
  TitleBox
} from '../../Styles/Components/NotificationCard';

import Up_green_arrow from '../../Assets/notification/Up_green_arrow.svg';
import Down_red_arrow from '../../Assets/notification/Down_red_arrow.svg';
import moment from 'moment';

const NotificationCard = ({ notification }) => {
  const formatTime = (timeString) => {
    if (!timeString) {
      return '-';
    }
    return moment(timeString).local().format('DD/MM/YYYY hh:mm:ss A');
  };
  return (
    <CardContainer>
      <CardInnerContainer>
        <DataContainer>
          <Reactangle status={notification.action}>
            <ArrowImage
              src={notification.action === 'buy' ? Up_green_arrow : Down_red_arrow}
              alt="Upward Green Arrow"
            />
          </Reactangle>
          <TitleBox>
            <Lbox>
              <Title>
                {notification.action === 'buy' ? 'Buy Alert!' : 'Sell Alert!'} -{' '}
                {notification.ticker_symbol}
              </Title>
              <Desc>
                by {notification.strategy_name} Strategy price at{' '}
                {parseFloat(notification.price).toFixed(2)}
              </Desc>
            </Lbox>
            <RBox>
              <Time>{formatTime(notification.createdAt)}</Time>
              {/*<Ellipse>{active && <EllipseImg src={active} alt="ellipse" />}</Ellipse>*/}
            </RBox>
          </TitleBox>
        </DataContainer>
      </CardInnerContainer>
    </CardContainer>
  );
};

export default NotificationCard;
