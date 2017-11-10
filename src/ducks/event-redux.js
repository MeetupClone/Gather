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
        payload: new Promise((resolve, reject) => {
            let eventFile = componentState.file
            const eventStorageRef = firebase.storage().ref();
            const eventUploadTask = eventStorageRef.child('eventPictures/' + eventFile.name).put(eventFile);
            eventUploadTask.on('state_changed', (snapshot) => {}, function(error) {}, function() {
                componentState.eventPic = eventUploadTask.snapshot.downloadURL;
                resolve(componentState)
            })
        }).then(result => {
           return axios.post('/api/event/create', componentState).then(result => {
                return { result }
            })
        })
    }
}


export function joinEvent(componentState) {
    return {
        type: JOIN_EVENT,
        payload: componentState
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
        payload: new Promise(() => {
            let eventFile = componentState.file
            const eventStorageRef = firebase.storage().ref();
            const eventUploadTask = eventStorageRef.child('eventPictures/' + eventFile.name).put(eventFile);
            console.log(componentState)
            eventUploadTask.on('state_changed', (snapshot) => {}, function(error) {}, function() {
                componentState.eventPic = eventUploadTask.snapshot.downloadURL;
                axios.post('/api/event/edit', componentState).then(result => {
                    return result
                })
            })
        })
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
        case CREATE_EVENT + "_PENDING":
            return { loading: true, created: false }
        case CREATE_EVENT + "_FULFILLED":
            return { loading: false, created: true }
        case JOIN_EVENT:
            return axios.post('/api/event/join', action.payload).then(result => {
                console.log(result.data[0].fcm_key, result.data[0].id)
                return Object.assign({}, state, action.payload)
            }).catch(error => {
                console.log(error)
                return state
            })
        case LEAVE_EVENT:
            return axios.post('/api/event/leave', action.payload).then(result => {
                return Object.assign({}, state, action.payload)
            })
        case EDIT_EVENT + "_PENDING":
            return Object.assign({}, state, { loading: true })
        case EDIT_EVENT + "_FULFILLED":
            return Object.assign({}, state, { loading: false })
        case DELETE_EVENT:
            axios.post('/api/event/delete', action.payload)
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }



}