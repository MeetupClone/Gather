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


export function createEvent(componentState) {
    return {
        type: CREATE_EVENT,
        payload: componentState
    }
}


export default function createEventReducer(state = initialState, action) {
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
        default:
            return state;
    }



}