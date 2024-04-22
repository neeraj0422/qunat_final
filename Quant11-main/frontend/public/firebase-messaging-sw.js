// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyDorkZ01lSLqfFZd1pzdCTb2kb-f2LNZAE',
  authDomain: 'tce-quant11.firebaseapp.com',
  projectId: 'tce-quant11',
  storageBucket: 'tce-quant11.appspot.com',
  messagingSenderId: '975802122715',
  appId: '1:975802122715:web:422759f172274cfbf3a7fe',
  measurementId: 'G-C335PKGHQ4'
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
