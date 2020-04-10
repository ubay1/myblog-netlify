import Vue from 'vue'
import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    messagingSenderId: "665502983297",
    apiKey: "AIzaSyD5jkeIkI5zMiCsvvqojsCmbBmpJ7L2UTE",
    authDomain: "lelango-5e5de.firebaseapp.com",
    databaseURL: "https://lelango-5e5de.firebaseio.com",
    projectId: "lelango-5e5de",
    storageBucket: "lelango-5e5de.appspot.com",
  });
}

// BF6c94Hz3yRs-0h3Qxw33wG68q2wZAaCq5tFPEblNChQNAg9ZJlqCxflmtNqLADwB9vwrjsndYI3QKCmwiEPNnY

// export default firebase
Vue.use(firebase)
