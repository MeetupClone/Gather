import React, { Component } from 'react';
import './App.css';

import './helpers.css';

import { fire as firebase } from "./fire"

import axios from "axios";

// import Footer from './components/footer/footer'
import Navbar from "./components/navbar/navbar"




class App extends Component {

    constructor() {
        super();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                localStorage.setItem('uid', user.uid)
                console.log(localStorage.getItem('uid'))


                axios.get(`/api/user/account/getPref/${user.uid}`).then(result => {
                    console.log(result)
                })
                // .then(result => console.log("getPref", result))
                // .catch(err => console.log("getPref error", err))
                
                axios.get(`/api/user/account/getCat/${user.uid}`)
            }
        })


        firebase.messaging().getToken()
            .then(function(currentToken) {
                console.log(currentToken)

            })
            .catch(function(err) {
                console.log('An error occurred while retrieving token. ', err);

            });


        firebase.messaging().onMessage(function(payload) {
            alert(payload.notification.title) 
            console.log(payload)
        });
    }

    render() {
        return (

            <div className="App">
            <Navbar/>
            </div>

        );
    }
}

export default App;