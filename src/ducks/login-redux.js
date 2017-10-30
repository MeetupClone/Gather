import { fire as firebase, facebookProvider, twitterProvider } from "../fire"
import axios from 'axios';

//INITIAL STATE OF DATA - IF NONE, EMPTY STRING, EMPTY ARRAY OR WHATEVER. FILLER SHIT.
const initialState = {
    uid: '',
    email: '',
    authenticated: false
}


//CONSTANTS
const AUTH_WITH_FACEBOOK = 'AUTH_WITH_FACEBOOK';
const AUTH_WITH_TWITTER = 'AUTH_WITH_TWITTER';
const LOGIN_WITH_EMAIL_PASSWORD = 'LOGIN_WITH_EMAIL_PASSWORD';
const GET_AUTH_INFO = 'GET_AUTH_INFO';
const SIGN_OUT = 'SIGN_OUT';


//ACTION BUILDERS REMEMBER TO EXPORT THEM

export function authWithFacebook(initialState){
  return {
    type: AUTH_WITH_FACEBOOK,
    initialState
  }
}

export function authWithTwitter(initialState){
  return {
    type: AUTH_WITH_TWITTER,
    initialState
  }
}

export function loginWithEmailPassword(email, password){
  return{
    type: LOGIN_WITH_EMAIL_PASSWORD,
    email,
    password
  }
}

export function getAuthInfo(initialState){
  return{
    type: GET_AUTH_INFO,
    initialState
  }
}

export function signOut(){
  return{
    type: SIGN_OUT,

  }
}


//REDUCER

export default function login(state = initialState, action){
  //SWTICH STATEMENTS HERE
  switch(action.type){
    case AUTH_WITH_FACEBOOK:
        firebase.auth().signInWithRedirect(facebookProvider)
            .then((user, error) => {
              console.log(user)
                if (error) {
                    console.log(error)
                } else {
                    Object.assign({}, state, {uid: user.uid, email: user.email, authenticated: true})
                }
            });
        break;
      case AUTH_WITH_TWITTER:
          firebase.auth().signInWithRedirect(twitterProvider)
              .then((user, error) => {
                console.log(user)
                  if (error) {
                      console.log(error);
                  } else {
                      Object.assign({}, state, {uid: user.uid, email: user.email, authenticated: true})
                  }

              });
          break;
      case LOGIN_WITH_EMAIL_PASSWORD:
          firebase.auth().signInWithEmailAndPassword(action.email, action.password)
              .then(user => {
                console.log(user)
                      Object.assign({}, state, {uid: user.uid, email: user.email, authenticated: true})
              })
          break;

    case GET_AUTH_INFO:
            firebase.auth().onAuthStateChanged(user => {
              console.log(user)
              if (user){
               Object.assign({}, state, {
                 uid: user.uid,
                 email: user.email,
                 authenticated: true
               })
             }
            })

  }


  //RETURN STATE
}
