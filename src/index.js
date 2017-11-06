import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store'
import {Provider} from 'react-redux'

import { fire as firebase } from "./fire"


ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router>
  </Provider>
    , document.getElementById('root'));
    registerServiceWorker();
