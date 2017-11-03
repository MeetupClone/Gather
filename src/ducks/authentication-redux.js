import { fire as firebase, facebookProvider, twitterProvider, googleProvider } from "../fire"
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
const AUTH_WITH_GOOGLE = 'AUTH_WITH_GOOGLE';
const AUTH_WITH_EMAIL_PASSWORD = 'AUTH_WITH_EMAIL_PASSWORD'
const LOGIN_WITH_EMAIL_PASSWORD = 'LOGIN_WITH_EMAIL_PASSWORD';
const GET_AUTH_INFO = 'GET_AUTH_INFO';
const SIGN_OUT = 'SIGN_OUT';


//ACTION BUILDERS REMEMBER TO EXPORT THEM

export function authWithFacebook(initialState) {
    return {
        type: AUTH_WITH_FACEBOOK,
        initialState
    }
}

export function authWithTwitter(initialState) {
    return {
        type: AUTH_WITH_TWITTER,
        initialState
    }
}

export function authWithGoogle(initialState) {
    return {
        type: AUTH_WITH_GOOGLE,
        initialState
    }
}

export function authWithEmailPassword(email, password) {
    return {
        type: AUTH_WITH_EMAIL_PASSWORD,
        payload: {
            email,
            password
        }
    }
}

export function loginWithEmailPassword(email, password, name) {
    console.log(email, password)
    return {
        type: LOGIN_WITH_EMAIL_PASSWORD,
        payload: {
            email,
            password,
            name
        }
    }
}

export function getAuthInfo(initialState) {
    return {
        type: GET_AUTH_INFO,
        initialState
    }
}

export function signOut() {
    return {
        type: SIGN_OUT
    }
}


export default function AuthenticationReducer(state = initialState, action) {
    switch (action.type) {

        case AUTH_WITH_EMAIL_PASSWORD:
            let emailValue = action.payload.email
            let passwordValue = action.payload.password
            let nameValue = action.payload.name
            firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue).then(user => {
                axios.post('/api/user/createUser', [user.uid, user.email, nameValue])
                console.log(user)
                return Object.assign({}, state, {
                        uid: user.uid,
                        email: user.email,
                        authenticated: true
                    })
            })
            return state;
        case AUTH_WITH_FACEBOOK:
            firebase.auth().signInWithRedirect(facebookProvider)
                .then((user, error) => {
                    return Object.assign({}, state, { uid: user.uid, email: user.email, authenticated: true })
                });
            return state
        case AUTH_WITH_TWITTER:
            firebase.auth().signInWithRedirect(twitterProvider)
                .then((user, error) => {
                    console.log(user)
                    return Object.assign({}, state, {
                        uid: user.uid,
                        email: user.email,
                        authenticated: true
                    })
                });
            return state;
        case AUTH_WITH_GOOGLE:
            firebase.auth().signInWithRedirect(googleProvider)
                .then((user, error) => {
                    return Object.assign({}, state, {
                        uid: user.uid,
                        email: user.email,
                        authenticated: true
                    })
                })
            return state;
        case LOGIN_WITH_EMAIL_PASSWORD:
            let email = action.payload.email;
            let password = action.payload.password
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    return Object.assign({}, state, {
                        uid: user.uid,
                        email: user.email,
                        authenticated: true
                    })
                })
            return state;

        case GET_AUTH_INFO:
            firebase.auth().onAuthStateChanged(user => {
                console.log(user)
                return Object.assign({}, state, {
                    uid: user.uid,
                    email: user.email,

                })
            })
            return state

        case SIGN_OUT:
            firebase.auth().signOut().then(result => {
                return Object.assign({}, state, {
                    authenticated: false
                })
            })
            break;
        default:
            return state;
    }

}