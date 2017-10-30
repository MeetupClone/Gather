import React, { Component } from "react";

import { Link } from "react-router-dom";

import { fire as firebase, facebookProvider, twitterProvider } from "../../fire"

import "./login.css";
import "../../helpers.css";
import axios from 'axios';

import {connect} from 'react-redux';

import {authWithFacebook, authWithTwitter, loginWithEmailPassword, getAuthInfo} from '../../ducks/login-redux.js'

export class Login extends Component {
    constructor(props) {
        super(props);


        this.state = {
            uid: '',
            email: '',
            authenticated: false
        }
    //
    //     firebase.auth().onAuthStateChanged(user => {
    //         this.setState({
    //             uid: user.uid,
    //             email: user.email,
    //             authenticated: true
    //         })
    //     }).bind(this)
    //
        this.signOut = this.signOut.bind(this);
    //     this.loginWithEmailPassword = this.loginWithEmailPassword.bind(this);
    //     this.getAuthInfo = this.getAuthInfo.bind(this);
    //     this.authWithFacebook = this.authWithFacebook.bind(this);
    }
    //
    // authWithFacebook() {
    //     firebase.auth().signInWithRedirect(facebookProvider)
    //         .then((user, error) => {
    //             if (error) {
    //                 console.log(error)
    //             } else {
    //                 console.log(this.state)
    //             }
    //         })
    // }
    //
    // authWithTwitter() {
    //     firebase.auth().signInWithRedirect(twitterProvider)
    //         .then((result, error) => {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 console.log("logged in");
    //             }
    //
    //         })
    // }
    //
    // loginWithEmailPassword(event) {
    //     event.preventDefault();
    //     const email = this.emailInput.value
    //     const password = this.passwordInput.value
    //     console.log(email, password)
    //
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //         .then(user => {
    //             this.setState({
    //                 uid: user.uid,
    //                 email: user.email,
    //                 authenticated: true
    //             })
    //             return user;
    //         })
    //         .then(user => {
    //             const messaging = firebase.messaging()
    //             messaging.requestPermission()
    //                 .then(result => {
    //                     return messaging.getToken().then(token => {
    //                         axios.put('/api/user/registerFCMKey', [this.state.uid, token])
    //                     })
    //                 })
    //         })
    // }
    //
    //
    // getAuthInfo() {
    //     firebase.auth().onAuthStateChanged(user => {
    //         console.log(user)
    //         console.log(this.state)
    //     })
    // }


    signOut() {
        firebase.auth().signOut().then(result => {
            this.setState({
                authenticated: false
            })
            console.log(result, "logged out")
        })
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                uid: user.uid,
                email: user.email,
                authenticated: true
            })
        }).bind(this)

    }


    render() {
        if (this.state.authenticated) {
            return (
                <div>
                  <button onClick= {(event) => this.signOut()}> Log Out </button>
                  <button onClick={(event) => getAuthInfo(this.state)}> Get Auth Info</button>
                </div>
            )
        } else {
            return (
                <div>
                  <h1 className="whiteBackground"> Log In Page </h1>

                  <div>
                    <Link to ="/register">
                      Register
                    </Link>


                    <hr style={{marginTop: '10px', marginBottom:'10px'}}/>


                    <h3>Sign In With Your Email</h3>
                    <form onSubmit={(event) => { loginWithEmailPassword(this.emailInput, this.passwordInput) }} ref={(form) => { this.loginForm = form }}>
                      Email
                      <input style={{width:"100%"}} name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="email"/>
                      <br/>
                      <br/>
                      Password
                      <input style={{width:"100%"}} name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="password"/>
                      <br/>
                      <br/>

                      <button onClick={(event) => {loginWithEmailPassword(this.emailInput, this.passwordInput)}}>Log In </button>
                    </form>
                    <br/>
                    <br/>
                    <hr style={{marginTop: '10px', marginBottom:'10px'}}/>
                    <br/>


                    <button onClick={(event) => getAuthInfo()}> Get Auth Info</button>
                    <br/>

                    <button onClick={() => {authWithFacebook() }}> Login With Facebook </button>
                    <br/>
                    <button onClick={() => {authWithTwitter()}}>Login With Twitter</button>

                    <br/>


                  </div>

                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
console.log("current state is:" + JSON.stringify(state))
};

const actions = {
  authWithFacebook,
  authWithTwitter,
  loginWithEmailPassword,
  getAuthInfo
}

export default connect(mapStateToProps, actions)(Login)
