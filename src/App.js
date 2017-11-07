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
        console.log(JSON.parse(localStorage.getItem('userData')).uid)
        firebase.auth().onAuthStateChanged(user => {
            if (!JSON.parse(localStorage.getItem('userData'))) {
                axios.get(`/api/user/getUserInfo/${user.uid}`).then(result => {
                    let userData = {
                        uid: user.uid,
                        userPic: result.data[0].profile_image,
                        userLocation: result.data[0].location,
                        userName: result.data[0].name,
                        userDescription: result.data[0].description
                    }
                    localStorage.setItem('userData', JSON.stringify(userData))
                 })
          }

            let getEvents = axios.get('/api/events').then(result => { return result.data})

            let getCat = axios.get(`/api/user/account/getCat/${user.uid}`).then(result => {
                return result.data
            })
            let getPref = axios.get(`/api/user/account/getPref/${user.uid}`).then(result => {
                return result.data
            })
            Promise.all([getEvents, getCat, getPref]).then(result => {
                let offlineData = {events: result[0]}
                localStorage.setItem('events', JSON.stringify(offlineData))
            })
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