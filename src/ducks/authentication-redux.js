import { fire as firebase, facebookProvider } from '../fire';
import axios from 'axios';

//INITIAL STATE OF DATA - IF NONE, EMPTY STRING, EMPTY ARRAY OR WHATEVER. FILLER SHIT.
const initialState = {
    uid: '',
    email: '',
    authenticated: false,
};
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        initialState.uid = user.uid;
    }
});

//CONSTANTS
const AUTH_WITH_FACEBOOK = 'AUTH_WITH_FACEBOOK';
const AUTH_WITH_EMAIL_PASSWORD = 'AUTH_WITH_EMAIL_PASSWORD';
const LOGIN_WITH_EMAIL_PASSWORD = 'LOGIN_WITH_EMAIL_PASSWORD';
const GET_AUTH_INFO = 'GET_AUTH_INFO';
const REGISTER_FCM_KEY = 'REGISTER_FCM_KEY';
const SIGN_OUT = 'SIGN_OUT';

//ACTION BUILDERS REMEMBER TO EXPORT THEM

export function authWithFacebook(categories) {
    return {
        type: AUTH_WITH_FACEBOOK,
        payload: firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then(result => {
                if (result.additionalUserInfo.isNewUser) {
                    return axios
                        .post('/api/user/createUser', [
                            result.user.uid,
                            result.user.email,
                            result.user.displayName,
                            result.user.photoURL,
                            categories,
                        ])
                        .then(() => {
                            return true;
                        });
                } else {
                    axios
                        .post('/api/user/createUser', [
                            result.user.uid,
                            result.user.email,
                            result.user.displayName,
                            result.user.photoURL,
                            categories,
                        ])
                        .then(() => {
                            return true;
                        });
                }
                return result.user;
            }),
    };
}

export function authWithEmailPassword(initialState) {
    return {
        type: AUTH_WITH_EMAIL_PASSWORD,
        payload: initialState,
    };
}

export function loginWithEmailPassword(initialState) {
    return {
        type: LOGIN_WITH_EMAIL_PASSWORD,
        payload: firebase
            .auth()
            .signInWithEmailAndPassword(
                initialState.email,
                initialState.password
            )
            .then(user => {
                localStorage.setItem('uid', user.uid);
                return user;
            }),
    };
}

export function getAuthInfo(uid) {
    return {
        type: GET_AUTH_INFO,
        payload: firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            return user;
        }),
    };
}

export function signOut() {
    return {
        type: SIGN_OUT,
    };
}

export default function AuthenticationReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_WITH_EMAIL_PASSWORD:
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    action.payload.email,
                    action.payload.password
                )
                .then(user => {
                    localStorage.setItem('loggedIn', true);
                    axios.post('/api/user/createUser', [
                        user.uid,
                        user.email,
                        action.payload.name,
                        'https://firebasestorage.googleapis.com/v0/b/gatherv0-b3651.appspot.com/o/defaultPic.webp?alt=media&token=73d67fbf-6f0e-40aa-8fc9-15ec9e8e4fd9',
                    ]);
                    return Object.assign({}, state, {
                        uid: user.uid,
                        email: user.email,
                        authenticated: true,
                    });
                });
            return Object.assign({}, state, { authenticated: true });
        case AUTH_WITH_FACEBOOK + '_PENDING':
            return Object.assign({}, state, { authenticated: false });
        case AUTH_WITH_FACEBOOK + '_FULFILLED':
            return { user: action.payload, authenticated: true };
        case LOGIN_WITH_EMAIL_PASSWORD + '_PENDING':
            return Object.assign({}, state, { authenticated: false });
        case LOGIN_WITH_EMAIL_PASSWORD + '_FULFILLED':
            return { userInfo: action.payload, authenticated: true };
        case GET_AUTH_INFO + '_PENDING':
            return { useruid: action.payload.uid, authenticated: true };
        case GET_AUTH_INFO + '_FULFILLED':
            return { useruid: action.payload.uid, authenticated: true };
        case REGISTER_FCM_KEY:
            firebase
                .messaging()
                .requestPermission()
                .then(() => {
                    return firebase
                        .messaging()
                        .getToken()
                        .then(token => {});
                });
            return state;
        case SIGN_OUT:
            firebase
                .auth()
                .signOut()
                .then(() => {
                    return Object.assign({}, state, {
                        authenticated: false,
                    });
                });
            break;
        default:
            return state;
    }
}
