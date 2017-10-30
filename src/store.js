import { createStore } from 'redux'; //Notice redux, not react-redux

import login from './ducks/login-redux.js'

let store = createStore(login);

export default store;
