import { fire as firebase, facebookProvider } from "../fire"
import axios from 'axios';


//INITIAL STATE OF DATA - IF NONE, EMPTY STRING, EMPTY ARRAY OR WHATEVER. FILLER SHIT.
const initialState = {
    uid: '',
    email: '',
    authenticated: false
}
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        initialState.uid = user.uid
    }
})

//CONSTANTS
const AUTH_WITH_FACEBOOK = 'AUTH_WITH_FACEBOOK';
const AUTH_WITH_EMAIL_PASSWORD = 'AUTH_WITH_EMAIL_PASSWORD'
const LOGIN_WITH_EMAIL_PASSWORD = 'LOGIN_WITH_EMAIL_PASSWORD';
const GET_AUTH_INFO = 'GET_AUTH_INFO';
const REGISTER_FCM_KEY = 'REGISTER_FCM_KEY'
const SIGN_OUT = 'SIGN_OUT';


//ACTION BUILDERS REMEMBER TO EXPORT THEM

export function authWithFacebook(initialState) {
    return {
        type: AUTH_WITH_FACEBOOK,
        payload: firebase.auth().signInWithPopup(facebookProvider)
            .then(result => {
                console.log(result)
                if (result.additionalUserInfo.isNewUser) {
                    console.log(result, "from redux")
                    return axios.post('/api/user/createUser', [result.user.uid, result.user.email, result.user.displayName, result.user.photoUrl])
                }
                return result.user

            })
    }
}

export function authWithEmailPassword(initialState) {
    return {
        type: AUTH_WITH_EMAIL_PASSWORD,
        payload: firebase.auth().signInWithEmailAndPassword(initialState.email, initialState.password)
            .then(user => {
                return user
            })
    }
}

export function loginWithEmailPassword(initialState) {
    console.log(initialState)
    return {
        type: LOGIN_WITH_EMAIL_PASSWORD,
        payload: firebase.auth().signInWithEmailAndPassword(initialState.email, initialState.password)
            .then(user => {
                console.log(user)
                return user
            })
    }
}

export function getAuthInfo(initialState) {
    return {
        type: GET_AUTH_INFO,
        payload: firebase.auth().onAuthStateChanged(user => { return user })
    }
}

export function signOut() {
    return {
        type: SIGN_OUT
    }
}

export function registerFcmKey(initialState) {
    return {
        type: REGISTER_FCM_KEY,
        initialState
    }
}


export default function AuthenticationReducer(state = initialState, action) {
    switch (action.type) {

        case AUTH_WITH_EMAIL_PASSWORD:
            let emailValue = action.payload.email
            let passwordValue = action.payload.password
            let nameValue = action.payload.name
            firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue).then(user => {
                localStorage.setItem('loggedIn', true)
                axios.post('/api/user/createUser', [user.uid, user.email, nameValue, 'https://firebasestorage.googleapis.com/v0/b/gatherv0-b3651.appspot.com/o/defaultPic.webp?alt=media&token=73d67fbf-6f0e-40aa-8fc9-15ec9e8e4fd9'])
                console.log(user)
                return Object.assign({}, state, {
                    uid: user.uid,
                    email: user.email,
                    authenticated: true
                })
            })
            return Object.assign({}, state, { authenticated: true })

        case AUTH_WITH_FACEBOOK + "_PENDING":
            return Object.assign({}, state, { authenticated: false })
        case AUTH_WITH_FACEBOOK + "_FULFILLED":
            let user = action.payload
            return { user, authenticated: true }

        case LOGIN_WITH_EMAIL_PASSWORD + "_PENDING":
            return Object.assign({}, state, { authenticated: false })

        case LOGIN_WITH_EMAIL_PASSWORD + "_FULFILLED":
            let userInfo = action.payload
            return { userInfo, authenticated: true }
        case GET_AUTH_INFO + "_PENDING":
            return Object.assign({}, state, { authenticated: false })
        case GET_AUTH_INFO + "_FULFILLED":
            let userInfo2 = action.payload
            return { userInfo2, authenticated: true }
        case REGISTER_FCM_KEY:
            const messaging = firebase.messaging()
            messaging.requestPermission().then(result => {
                console.log("have permission")
                return messaging.getToken()
                    .then(token => {
                        console.log(token)
                    })
            })
            return state;
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