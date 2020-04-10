// For local
importScripts('https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.4.0/firebase-messaging.js');

// if (!firebase.apps.length) {
    firebase.initializeApp({
        messagingSenderId: "665502983297",
        apiKey: "AIzaSyD5jkeIkI5zMiCsvvqojsCmbBmpJ7L2UTE",
        authDomain: "lelango-5e5de.firebaseapp.com",
        databaseURL: "https://lelango-5e5de.firebaseio.com",
        projectId: "lelango-5e5de",
        storageBucket: "lelango-5e5de.appspot.com",
    });
// };

const messaging = firebase.messaging();

// messaging.usePublicVapidKey("BF6c94Hz3yRs-0h3Qxw33wG68q2wZAaCq5tFPEblNChQNAg9ZJlqCxflmtNqLADwB9vwrjsndYI3QKCmwiEPNnY");

messaging.setBackgroundMessageHandler(function (payload) {
  const notification = JSON.parse(payload.notification);
  // Customize notification here
  const notificationTitle = notification.title;
  const notificationOptions = {
      body: notification.body,
      icon: notification.icon
  };

  return registration.showNotification(notificationTitle,
      notificationOptions);
});
