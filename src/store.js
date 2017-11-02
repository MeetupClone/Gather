import { createStore, combineReducers } from 'redux'; 

import AuthenticationReducer from './ducks/authentication-redux'
import CreateEventReducer from './ducks/create-event'
import createGroupReducer from './ducks/create-group-redux'

let store = createStore(combineReducers({login, createEventReducer, createGroupReducer}));

export default store;
