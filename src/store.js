import { createStore } from 'redux'; //Notice redux, not react-redux

import login from './ducks/login-redux'

import makeEvents from './ducks/create-event'

let store = createStore(login);

export default store;
