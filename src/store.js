import { createStore, combineReducers } from 'redux'; //Notice redux, not react-redux

import login from './ducks/authentication-redux'

import createEventReducer from './ducks/create-event'

import createGroupReducer from './ducks/create-group-redux'

let store = createStore(combineReducers({login, createEventReducer, createGroupReducer}));

export default store;
