import React, { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import GlobalStyle from './Styles/GlobalStyle';
import './Fonts/fonts.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@sweetalert2/theme-dark/dark.scss';
// import {onMessageListener} from "./firebase";

const App = () => {
  var fcmMessageId = null;
  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (fcmMessageId !== event.data.fcmMessageId) {
        fcmMessageId = event.data.fcmMessageId;
        const payload = event.data;
        // Handle the notification payload
        if (payload && payload.notification.body) {
          toast.success(payload.notification.body);
        }
      }
    });
  }, []);
  return (
    <>
      <GlobalStyle />
      <ToastContainer
        toastStyle={{
          background:
            'linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),#121212',
          color: 'rgba(255, 255, 255, 0.6)'
        }}
      />
      <AppRoutes />
    </>
  );
};

export default App;
