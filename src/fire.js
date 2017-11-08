import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBG4KjhU5SvvCJd7H3FmffrJdh-TKx4-aw",
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