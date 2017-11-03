import axios from 'axios';

import { fire as firebase } from "../fire"

const initialState = {
    eventPic: '',
    eventName: '',
    uid: '',
    eventDescription: '',
    eventLocation: '',
    eventCategory: '',
    created: false,
    website: '',
    confirmModal: false
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        initialState.uid = user.uid
    }
})

const CREATE_EVENT = 'CREATE_EVENT';
const JOIN_EVENT = 'JOIN_EVENT';
const LEAVE_EVENT = 'LEAVE_EVENT';
const EDIT_EVENT = 'EDIT_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';


export function createEvent(componentState) {
    return {
        type: CREATE_EVENT,
        payload: componentState
    }
}

export function joinEvent(componentState) {
    return {
        type: JOIN_EVENT,
        payload: [componentState.eventId, componentState.currentUserUid]
    }
}

export function leaveEvent(componentState) {
    return {
        type: LEAVE_EVENT,
        payload: [componentState.eventId, componentState.currentUserUid]
    }
}

export function editEvent(componentState) {
    return {
        type: EDIT_EVENT,
        payload: componentState
    }
}

export function deleteEvent(componentState) {
    return {
        type: DELETE_EVENT,
        payload: componentState
    }
}


export default function EventReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_EVENT:
            let file = action.payload.file
            const storageRef = firebase.storage().ref();
            const uploadTask = storageRef.child('profilePictures/' + file.name).put(file);
            uploadTask.on('state_changed', (snapshot) => {}, function(error) {}, function() {
                action.payload.eventPic = uploadTask.snapshot.downloadURL;
                axios.post('/api/event/create', action.payload)
                action.payload.created = true;
                return Object.assign({}, state, action.payload)
            })
            return state;
        case JOIN_EVENT:
            return axios.post('/api/event/join', action.payload).then(result => {
                return Object.assign({}, state, action.payload)
            })
        case LEAVE_EVENT:
            return axios.post('/api/event/leave', action.payload).then(result => {
                return Object.assign({}, state, action.payload)
            })
        case EDIT_EVENT:
        let eventFile = action.payload.file
            const eventStorageRef = firebase.storage().ref();
            const eventUploadTask = eventStorageRef.child('eventPictures/' + eventFile.name).put(eventFile);
            console.log(action.payload)
            eventUploadTask.on('state_changed', (snapshot) => {}, function(error) {}, function() {
                action.payload.eventPic = eventUploadTask.snapshot.downloadURL;
                axios.post('/api/event/edit', action.payload)
                return Object.assign({}, state, action.payload)
            })
        case DELETE_EVENT:
            {
                return state;
            }

        default:
            return state;
    }



}