import { createStore, combineReducers } from 'redux'; 

import AuthenticationReducer from './ducks/authentication-redux'

import CreateEventReducer from './ducks/create-event'

let store = createStore(combineReducers({AuthenticationReducer, CreateEventReducer}));

export default store;
