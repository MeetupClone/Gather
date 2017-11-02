import axios from 'axios';

const initialState = {
    name: '',
    category: '',
    description: '',
    website: '',
    twitter: '',
    facebook: '',
    instagram: ''
}

const CREATE_GROUP = 'CREATE_GROUP';

export function createGroup(componentState){
    return {
        type: CREATE_GROUP,
        payload: componentState
    }
}

export default function createGroupReducer(state = initialState, action){
    switch(action.type){
        case CREATE_GROUP:
            axios.post('/api/groups/create', action.payload).then(result => {
                return true
            })
            return Object.assign({}, state, action.payload)

            break;

            default: 
                return state;
    }
}