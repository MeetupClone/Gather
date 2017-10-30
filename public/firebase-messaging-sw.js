importScripts("https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js")

const config = {
    apiKey: "AIzaSyCuFloA8xjTLD0tWlYJyF8JLQMV3PKAbb0",
    authDomain: "gatherv0-b3651.firebaseapp.com",
    databaseURL: "https://gatherv0-b3651.firebaseio.com",
    projectId: "gatherv0-b3651",
    storageBucket: "gatherv0-b3651.appspot.com",
    messagingSenderId: "710004267791"
  };

firebase.initializeApp(config);

const messaging = firebase.messaging();