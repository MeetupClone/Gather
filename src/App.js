import React, { Component } from 'react';
import './App.css';

import { Link } from "react-router-dom";
import routes from "./routes";

import { fire as firebase } from "./fire"



class App extends Component {

    constructor() {
        super();

        const messaging = firebase.messaging()
        messaging.requestPermission().then(result => {
            console.log("have permission")
            return messaging.getToken()
                .then(token => {
                    console.log(token)
                })
        })

        firebase.messaging().onMessage(function(payload){
          alert(payload.notification.title)
          console.log('onMessage', payload)
        });
    }




    render() {
        return (
            <div className="App">
        <header className="App-header">
          <Link to ="/">
            Home
          </Link>
          <Link to ="/login">
            Login
          </Link>
          <Link to ="/user">
            User
          </Link>
          <Link to ="/pushNotifications">
            Push Notifications
          </Link>
        </header>
        <div>{routes}</div>
      </div>
        );
    }
}

export default App;
