import { createStore, combineReducers } from 'redux'; 

import AuthenticationReducer from './ducks/authentication-redux'
import CreateEventReducer from './ducks/create-event'
import CreateGroupReducer from './ducks/create-group-redux'

let store = createStore(combineReducers({AuthenticationReducer, CreateEventReducer, CreateGroupReducer}));

export default store;
