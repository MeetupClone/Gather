import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import AuthenticationReducer from './ducks/authentication-redux'
import EventReducer from './ducks/event-redux'
import GroupReducer from './ducks/group-redux'

let store = createStore(combineReducers({ AuthenticationReducer, EventReducer, GroupReducer }),
    devToolsEnhancer()
);
export default store;