import axios from 'axios';

import { fire as firebase } from '../fire';

const initialState = {
    eventPic: '',
    eventName: '',
    uid: '',
    eventDescription: '',
    eventLocation: '',
    eventCategory: '',
    website: '',
    created: false,
    joined: false,
    confirmModal: false,
    loading: true,
};

const CREATE_EVENT = 'CREATE_EVENT';
const JOIN_EVENT = 'JOIN_EVENT';
const LEAVE_EVENT = 'LEAVE_EVENT';
const EDIT_EVENT = 'EDIT_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';

export function createEvent(componentState) {
    return {
        type: CREATE_EVENT,
        payload: new Promise(resolve => {
            let eventFile = componentState.file;
            const eventStorageRef = firebase.storage().ref();
            const eventUploadTask = eventStorageRef
                .child('eventPictures/' + eventFile.name)
                .put(eventFile);
            eventUploadTask.on('state_changed', () => {}, () => {}, function() {
                componentState.eventPic = eventUploadTask.snapshot.downloadURL;
                resolve(componentState);
            });
        }).then(() => {
            return axios
                .post('/api/event/create', componentState)
                .then(result => {
                    return { result };
                });
        }),
    };
}

export function joinEvent(componentState) {
    return {
        type: JOIN_EVENT,
        payload: axios
            .post('/api/event/join', componentState)
            .then(result => result.data),
    };
}

export function leaveEvent(componentState) {
    return {
        type: LEAVE_EVENT,
        payload: [componentState.eventId, componentState.currentUserUid],
    };
}

export function editEvent(state) {
    let eventFile = state.file;
    const eventStorageRef = firebase.storage().ref();
    const eventUploadTask = eventStorageRef
        .child('eventPictures/' + eventFile.name)
        .put(eventFile);
    return {
        type: EDIT_EVENT,
        payload: eventUploadTask.on(
            'state_changed',
            () => {},
            () => {},
            () => {
                state.eventPic = eventUploadTask.snapshot.downloadURL;
                return axios.post('/api/event/edit', state).then(result => {
                    return result.data;
                });
            }
        ),
    };
}

export function deleteEvent(componentState) {
    return {
        type: DELETE_EVENT,
        payload: axios
            .post('/api/event/delete', componentState)
            .then(result => result.data),
    };
}

export default function EventReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_EVENT + '_PENDING':
            return { loading: true, created: false };
        case CREATE_EVENT + '_FULFILLED':
            return {
                loading: false,
                created: true,
                ...action.payload.result.data[0],
            };
        case `${JOIN_EVENT}_PENDING`:
            return Object.assign({ loading: true });
        case `${JOIN_EVENT}_FULFILLED`:
            return Object.assign({ loading: false, joined: true });
        case `${JOIN_EVENT}_REJECTED`:
            return Object.assign({ loading: true });
        case LEAVE_EVENT:
            return axios.post('/api/event/leave', action.payload).then(() => {
                return Object.assign({}, state, action.payload);
            });
        case EDIT_EVENT + '_PENDING':
            return Object.assign({}, state, { loading: true });
        case EDIT_EVENT + '_FULFILLED':
            return Object.assign({}, state, { loading: false });
        case DELETE_EVENT:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
