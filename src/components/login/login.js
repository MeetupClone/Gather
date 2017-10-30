import React, { Component } from "react";

import { Link } from "react-router-dom";

import { fire as firebase, facebookProvider, twitterProvider } from "../../fire"

import "./login.css";
import "../../helpers.css";
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);


        this.state = {
            uid: '',
            email: '',
            authenticated: false
        }

        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                uid: user.uid,
                email: user.email,
                authenticated: true
            })
            console.log(this.state)
        }).bind(this)

        this.signOut = this.signOut.bind(this);
        this.loginWithEmailPassword = this.loginWithEmailPassword.bind(this);
        this.getAuthInfo = this.getAuthInfo.bind(this);
        this.authWithFacebook = this.authWithFacebook.bind(this);
    }



    authWithFacebook() {
        firebase.auth().signInWithRedirect(facebookProvider)
            .then((user, error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(this.state)
                }
            })
    }

    authWithTwitter() {
        firebase.auth().signInWithRedirect(twitterProvider)
            .then((result, error) => {
                console.log(result.uid)
                if (error) {
                    console.log(error);
                } else {
                    console.log("logged in");
                }

            })
    }

    loginWithEmailPassword(event) {
        event.preventDefault();
        const email = this.emailInput.value
        const password = this.emailInput.value

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                this.setState({
                    User: {
                        uid: user.uid,
                        email: user.email
                    },
                    authenticated: true
                })
            })
    }


    getAuthInfo() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                return this.setState({
                    uid: user.uid,
                    email: user.email,
                    authenticated: true

                })
            }
            console.log(this.state)
        })
    }


    signOut() {
        firebase.auth().signOut().then(result => {
            console.log(result, "logged out")
        })
    }

    componentWillMount() {
        () => { console.log(this.state) }

    }

    // const messaging = firebase.messaging()
    // messaging.requestPermission()
    //     .then(result => {
    //         return messaging.getToken().then(token => {
    //             console.log(this.state)
    //             // axios.put('/api/user/registerFCMKey', )
    //         })
    //     })


    render() {

        for (var i = 0; i < 1; i++) {
            console.log(this.state)
        }
        return (
            <div>
                <h1 className="whiteBackground"> Log In Page </h1>

                     <div>
                        <Link to ="/register">
                        Register 
                        </Link>


            <hr style={{marginTop: '10px', marginBottom:'10px'}}/>


             <h3> Sign In With Your Email</h3>
            <form onSubmit={(event) => { this.loginWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
            Email
            <input style={{width:"100%"}} name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="email"/>
          <br/>
          <br/>
            Password
            <input style={{width:"100%"}} name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="password"/>
          <br/>
          <br/>
          
          <button onClick={(event) => {this.loginWithEmailPassword(event)}}>Log In </button>
            </form>
            <br/>
            <br/>
                <hr style={{marginTop: '10px', marginBottom:'10px'}}/>    
                <br/>


                        <button onClick={(event) => this.getAuthInfo()}> Get Auth Info</button>
                        <br/>
                        
                        <button onClick={() => {this.authWithFacebook() }}> Login With Facebook </button>
                        <br/>
                        <button onClick={() => {this.authWithTwitter()}}>Login With Twitter</button>

                        <br/>
                        <button onClick= {(event) => this.signOut()}> Log Out </button>
                        <br/>
                        

                    </div>
            
            </div>
        )
    }



}