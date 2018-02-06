import axios from 'axios';

import { fire as firebase } from '../fire';

const initialState = {
    groupPic: '',
    groupName: '',
    groupOwnerUid: '',
    groupDescription: '',
    groupLocation: '',
    groupCategory: '',
    created: false,
    website: '',
    currentUserUid: '',
};

const CREATE_GROUP = 'CREATE_GROUP';
const JOIN_GROUP = 'JOIN_GROUP';
const LEAVE_GROUP = 'LEAVE_GROUP';
const EDIT_GROUP = 'EDIT_GROUP';
const DELETE_GROUP = 'DELETE_GROUP';

export function createGroup(componentState) {
    return {
        type: CREATE_GROUP,
        payload: componentState,
    };
}

export function joinGroup(componentState) {
    return {
        type: JOIN_GROUP,
        payload: [componentState.groupId, componentState.currentUserUid],
    };
}

export function leaveGroup(componentState) {
    return {
        type: LEAVE_GROUP,
        payload: [componentState.groupId, componentState.currentUserUid],
    };
}

export function editGroup(componentState) {
    return {
        type: EDIT_GROUP,
        payload: componentState,
    };
}

export function deleteGroup(componentState) {
    return {
        type: DELETE_GROUP,
        payload: componentState,
    };
}

export default function GroupReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_GROUP:
            if (action.payload.file) {
                let file = action.payload.file;
                const storageRef = firebase.storage().ref();
                const uploadTask = storageRef
                    .child('eventPictures/' + file.name)
                    .put(file);
                return uploadTask.on(
                    'state_changed',
                    () => {},
                    () => {},
                    function() {
                        action.payload.groupPic =
                            uploadTask.snapshot.downloadURL;
                        axios
                            .post('/api/groups/create', action.payload)
                            .then(() => {
                                return Object.assign({}, state, action.payload);
                            });
                    }
                );
            } else {
                return axios
                    .post('/api/groups/create', action.payload)
                    .then(() => {
                        action.payload.created = true;
                        return Object.assign({}, state, action.payload);
                    });
            }
        case JOIN_GROUP:
            return axios.post('/api/group/join', action.payload).then(() => {
                return Object.assign({}, state, action.payload);
            });
        case EDIT_GROUP:
            return axios.post('/api/group/edit', action.payload).then(() => {
                return Object.assign({}, state, action.payload);
            });
        case DELETE_GROUP:
            return axios.post('/api/group/delete', action.payload).then(() => {
                return Object.assign({}, state, action.payload);
            });
        case LEAVE_GROUP:
            return axios.post('/api/group/leave', action.payload).then(() => {
                return Object.assign({}, state, action.payload);
            });
        default:
            return state;
    }
}
