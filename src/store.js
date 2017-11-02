import { createStore, combineReducers } from 'redux'; //Notice redux, not react-redux

import login from './ducks/login-redux'

import createEventReducer from './ducks/create-event'

let store = createStore(combineReducers({login, createEventReducer}));

export default store;
