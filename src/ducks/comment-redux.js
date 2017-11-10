import axios from 'axios';

const initialState = {
    comment: '',
    username: '',
    date: ''
}

const POST_COMMENT = 'POST_COMMENT';

export function postComment(componentState) {
    return {
        type: POST_COMMENT,
        payload: componentState
    }
}

export default function CommentReducer(state = initialState, action) {
    switch (action.type) {
        case POST_COMMENT:
            axios.post('/api/comment/post', action.payload)
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}