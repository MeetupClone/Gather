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
    joined: false,
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

export function joinGroup(state) {
    return {
        type: JOIN_GROUP,
        payload: axios.post('/api/group/join', state).then(res => res.data),
    };
}

export function leaveGroup(state) {
    return {
        type: LEAVE_GROUP,
        payload: axios
            .post('/api/group/leave', {
                groupid: state.groupid,
                uid: state.uid,
            })
            .then(res => res.data),
    };
}

export function editGroup(state) {
    return {
        type: EDIT_GROUP,
        payload: axios.post('/api/group/edit', state).then(res => res.data),
    };
}

export function deleteGroup(state) {
    return {
        type: DELETE_GROUP,
        payload: axios.post('/api/group/delete', state).then(res => res.data),
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
        case `${JOIN_GROUP}_PENDING`:
            return Object.assign({}, state, action.payload);
        case `${JOIN_GROUP}_FULFILLED`:
            return Object.assign({}, state, { joined: true });
        case `${JOIN_GROUP}_REJECTED`:
            return Object.assign({}, state, action.payload);
        case `${LEAVE_GROUP}_PENDING`:
            return Object.assign({}, state, action.payload);
        case `${LEAVE_GROUP}_FULFILLED`:
            return Object.assign({}, state, { joined: false });
        case `${LEAVE_GROUP}_REJECTED`:
            return Object.assign({}, state, action.payload);
        case `${EDIT_GROUP}_PENDING`:
            return Object.assign({}, state, action.payload);
        case `${EDIT_GROUP}_FULFILLED`:
            return Object.assign({}, state, {
                ...action.payload,
            });
        case `${EDIT_GROUP}_REJECTED`:
            return Object.assign({}, state, action.payload);
        case `${DELETE_GROUP}_PENDING`:
            return Object.assign({}, state, action.payload);
        case `${DELETE_GROUP}_FULFILLED`:
            return Object.assign({}, state, { joined: false });
        case `${DELETE_GROUP}_REJECTED`:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
