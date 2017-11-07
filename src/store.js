import { createStore, combineReducers, applyMiddleware } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import AuthenticationReducer from './ducks/authentication-redux'
import EventReducer from './ducks/event-redux'
import GroupReducer from './ducks/group-redux'
import promiseMiddleware from "redux-promise-middleware"

let store = createStore(combineReducers({ AuthenticationReducer, EventReducer, GroupReducer }),
    devToolsEnhancer(),
    applyMiddleware(promiseMiddleware())
);
export default store;