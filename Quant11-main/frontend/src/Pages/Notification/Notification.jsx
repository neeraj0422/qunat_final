import React, { useEffect, useRef, useState } from 'react';
import { MainContainer } from '../../Styles/Components/GlobalDashboard';
import NotificationCard from '../../Components/Notification/NotificationCard';
// import Up_green_arrow from '../../Assets/notification/Up_green_arrow.svg';
// import Down_red_arrow from '../../Assets/notification/Down_red_arrow.svg';
// import Ellipse from '../../Assets/notification/Ellipse.svg';
import {
  Box,
  Container,
  MainTitle,
  NotificationCardContainer,
  Title
} from '../../Styles/Pages/NotificationPageStyle';
import apiRequest from '../../api/api';

const Notification = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchNotificationList = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const { responseData } = await apiRequest('api/v1/notifications/list', 'POST', {
          page: page,
          limit: 3
        });
        if (responseData.data.length > 0) {
          setNotificationList((prevList) => [...prevList, ...responseData.data]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        fetchNotificationList();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 1.0
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore, page]);

  return (
    <MainContainer>
      <Container>
        <MainTitle>Notification</MainTitle>
        <Box>
          {notificationList.length > 0 ? (
            <>
              <Title>New</Title>
              <NotificationCardContainer>
                {notificationList.map((notification, index) => (
                  <React.Fragment key={index}>
                    <NotificationCard notification={notification} />
                  </React.Fragment>
                ))}
              </NotificationCardContainer>
            </>
          ) : (
            <p>No new Notifications</p>
          )}
          <div ref={loaderRef}></div>
        </Box>
      </Container>
    </MainContainer>
  );
};

export default Notification;
