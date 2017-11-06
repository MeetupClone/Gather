import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCuFloA8xjTLD0tWlYJyF8JLQMV3PKAbb0",
    authDomain: "gatherv0-b3651.firebaseapp.com",
    databaseURL: "https://gatherv0-b3651.firebaseio.com",
    projectId: "gatherv0-b3651",
    storageBucket: "gatherv0-b3651.appspot.com",
    messagingSenderId: "710004267791"
  };

const fire = firebase.initializeApp(config);

const facebookProvider = new firebase.auth.FacebookAuthProvider();

const firebaseMessaging = firebase.messaging()

export {fire, facebookProvider, firebaseMessaging};