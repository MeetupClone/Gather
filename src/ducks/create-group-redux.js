import axios from 'axios';


import { fire as firebase } from "../fire"

const initialState = {
    name: '',
    category: '',
    description: '',
    website: '',
    twitter: '',
    facebook: '',
    instagram: '',
    uid: '',
    created: ''

}



const CREATE_GROUP = 'CREATE_GROUP';

export function createGroup(componentState) {
    return {
        type: CREATE_GROUP,
        payload: componentState
    }
}

export default function createGroupReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_GROUP:
            console.log(action.payload)
            return axios.post('/api/groups/create', action.payload).then(result => {
                initialState.created = true;
                action.payload.created = true;
                console.log(initialState, action.payload)
                return Object.assign({}, state, action.payload)
            })
            
        default:
            return state;
    }
}