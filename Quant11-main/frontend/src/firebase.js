import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyByof9cRrvDFWKL3Bc90JMg8md8Vxzd2NU",
  authDomain: "quant11.firebaseapp.com",
  projectId: "quant11",
  storageBucket: "quant11.appspot.com",
  messagingSenderId: "4796970993",
  appId: "1:4796970993:web:e6a10c9871483fbd60b650",
  measurementId: "G-J4WEHK7464"
};

const vapidKey =
  
  'BBTDiiFDXhL9TX6S2r_5qtxMXodzxt705RKU_CpM5SD-D_VYg63i8ttbtauEBsBZawZuKRtfQ1vaHwNXtVdaNto';
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = async (setTokenFound, token) => {
  return getToken(messaging, { vapidKey: vapidKey })
    .then(async (currentToken) => {
      if (currentToken) {
        await fetch(`http://localhost:8080/api/v1/device-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 6024
          },
          body: JSON.stringify({ token: currentToken, type: 'web' })
        });
        setTokenFound(true);
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const auth = getAuth(firebaseApp);
