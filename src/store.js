import { createStore } from 'redux'; //Notice redux, not react-redux

import login from './ducks/login-redux'

let store = createStore(login);


console.log(store)
export default store;
