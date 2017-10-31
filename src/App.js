import React, { Component } from 'react';
import './App.css';

import { Link } from "react-router-dom";
import routes from "./routes";

import './navbar/navbar.css'; 
import './helpers.css';

import { fire as firebase } from "./fire"






class App extends Component {

    constructor() {
        super();
        firebase.messaging().onMessage(function(payload){
          alert(payload.notification.title)
          console.log('onMessage', payload)
        });
    }




    render() {
        return (
            <a className="App">
        <header className="App-header">
          <a>
          <Link to ="/">
            Home
          </Link>
          </a>
          <a>
          <Link to ="/login">
            Login
          </Link>
          </a>
          <a>
          <Link to ="/user">
            User
          </Link>
          </a>
          <a>
          <Link to = "/explore">
            Explore
          </Link>
          </a>
          <a>
          <Link to = "/event/create">
            Create Event
          </Link>
          </a>
          <a>
          <Link to ="/pushNotifications">
            Push Notifications
          </Link>
          </a>
        </header>
        <a>{routes}</a>
      </a>
        );
    }
}

export default App;
