import axios from 'axios';

import { fire as firebase } from "../fire"

const initialState = {
    groupPic: '',
    groupName: '',
    groupOwnerUid: '',
    groupDescription: '',
    groupLocation: '',
    groupCategory: '',
    created: false,
    website: '',
    currentUserUid: ''
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        initialState.currentUserUid = user.uid
    }
})

const CREATE_GROUP = 'CREATE_GROUP';
const JOIN_GROUP = 'JOIN_GROUP';
const LEAVE_GROUP = 'LEAVE_GROUP';
const EDIT_GROUP = 'EDIT_GROUP';
const DELETE_GROUP = 'DELETE_GROUP';


export function createGroup(componentState) {
    return {
        type: CREATE_GROUP,
        payload: componentState
    }
}

export function joinGroup(componentState) {
    return {
        type: JOIN_GROUP,
        payload: [componentState.groupId, componentState.currentUserUid]
    }
}

export function leaveGroup(componentState) {
    return {
        type: LEAVE_GROUP,
        payload: [componentState.groupId, componentState.currentUserUid]
    }
}

export function editGroup(componentState) {
    return {
        type: EDIT_GROUP,
        payload: componentState
    }
}

export function deleteGroup(componentState) {
    return {
        type: DELETE_GROUP,
        payload: componentState
    }
}


export default function GroupReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_GROUP:
            return axios.post('/api/groups/create', action.payload).then(result => {
                action.payload.created = true;
                return Object.assign({}, state, action.payload)
            })
        case JOIN_GROUP:
            return axios.post('/api/group/join', action.payload).then(result => {
                return Object.assign({}, state, action.payload)
            })
        case LEAVE_GROUP:
            return axios.post('/api/group/leave', action.payload).then(result => {
                return Object.assign({}, state, action.payload)
            })
        default:
            return state;
    }



}