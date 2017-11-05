import { createStore, combineReducers } from 'redux'; 

import AuthenticationReducer from './ducks/authentication-redux'
import CreateGroupReducer from './ducks/create-group-redux'
import eventReducer from './ducks/event-redux'
import groupReducer from './ducks/group-redux'

let store = createStore(combineReducers({AuthenticationReducer, CreateGroupReducer, eventReducer, groupReducer}));

export default store;
