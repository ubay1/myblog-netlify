const options = {"firebaseVersion":"7.13.2","config":{"apiKey":"AIzaSyD5jkeIkI5zMiCsvvqojsCmbBmpJ7L2UTE","authDomain":"lelango-5e5de.firebaseapp.com","databaseURL":"https:\u002F\u002Flelango-5e5de.firebaseio.com","projectId":"lelango-5e5de","storageBucket":"lelango-5e5de.appspot.com","messagingSenderId":"665502983297","appId":"1:665502983297:web:b48761b4791969cd2bd980","measurementId":"G-DFKXG10089","fcmPublicVapidKey":"BF6c94Hz3yRs-0h3Qxw33wG68q2wZAaCq5tFPEblNChQNAg9ZJlqCxflmtNqLADwB9vwrjsndYI3QKCmwiEPNnY"},"onFirebaseHosting":false}
const version = options.firebaseVersion
const onFirebaseHosting = options.onFirebaseHosting

if (onFirebaseHosting) {
  // Only works on Firebase hosting!
  importScripts('/__/firebase/' + version + '/firebase-app.js')
  importScripts('/__/firebase/' + version + '/firebase-messaging.js')
  importScripts('/__/firebase/init.js')
}
else {
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-app.js'
  )
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-messaging.js'
  )
  firebase.initializeApp(options.config)
}

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.info("SW received the message: ", payload);
  const notification = payload.notification;

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: notification.image,
    vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
    actions: [
      // First item is always taken as click action (see comment below)
      {
        title: "Visit",
        action: notification.clickPath
      }
    ]
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

self.addEventListener('notificationclick', function(e) {
  const notification = e.notification
  // MARK 1 -> always takes first item
  const clickAction = notification.actions[0].action
  const action = e.action
  if (action === 'close') {
    notification.close()
  } else {
    clients.openWindow(clickAction)
    notification.close()
  }
})
