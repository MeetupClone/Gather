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
<<<<<<< HEAD

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid,
                    email: user.email,
                    authenticated: true
                })
            }
        }).bind(this)

        this.signOut = this.signOut.bind(this);
        this.loginWithEmailPassword = this.loginWithEmailPassword.bind(this);
        this.getAuthInfo = this.getAuthInfo.bind(this);
        this.authWithFacebook = this.authWithFacebook.bind(this)
        this.authWithTwitter = this.authWithTwitter.bind(this);
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
        const password = this.passwordInput.value
        console.log(email, password)

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                this.setState({
                    uid: user.uid,
                    email: user.email,
                    authenticated: true
                })
                return user;
            })
            .then(user => {
                const messaging = firebase.messaging()
                messaging.requestPermission()
                    .then(result => {
                        return messaging.getToken().then(token => {
                            axios.put('/api/user/registerFCMKey', [this.state.uid, token])
                        })
                    })
            })
    }


    getAuthInfo() {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user)
            console.log(this.state)
        })
=======
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
>>>>>>> 771ef768ea4b63cf126185dbba99f70daca6dd83
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
        // firebase.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         this.setState({
        //             uid: user.uid,
        //             email: user.email,
        //             authenticated: true
        //         })
        //     } else {
        //         return false;
        //     }
        // }).bind(this)

    }


    render() {
        if (this.state.authenticated) {
            return (
                <div>
<<<<<<< HEAD
                <button className="buttons" onClick= {(event) => this.signOut()}> Log Out </button>
                <button onClick={(event) => this.getAuthInfo()}> Get Auth Info</button>
=======
                  <button onClick= {(event) => this.signOut()}> Log Out </button>
                  <button onClick={(event) => getAuthInfo(this.state)}> Get Auth Info</button>
>>>>>>> 771ef768ea4b63cf126185dbba99f70daca6dd83
                </div>
            )
        } else {
            return (
<<<<<<< HEAD
                <div id="login-page">
                        <form onSubmit={(event)=> { this.loginWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                            <input name="email" type="email" ref={(input)=> {this.emailInput = input}} placeholder="Email"/>
                            <input name="password" type="password" ref={(input)=> {this.passwordInput = input}} placeholder="Password"/>
                            <button className="login-button box-shadow" onClick={(event)=> {this.loginWithEmailPassword(event)}}>Log In </button>
                            <Link to="/register">
                            <button className="register-button box-shadow">Register </button>
                            </Link>
                        </form>
                        <div id="providers-auth" className="center">
                            <button className="auth-button google box-shadow"><img className="auth-icon" src={require( "./assets/google.svg")} alt="Google" />Sign In With Google </button>
                            <button className="auth-button facebook box-shadow" onClick={()=> {this.authWithFacebook() }}><img className="auth-icon" src={require( "./assets/facebook.svg")} alt="facebook" /> Sign In With Facebook </button>
                            <button className="auth-button twitter box-shadow" onClick={()=> {this.authWithTwitter()}}><img className="auth-icon" src={require( "./assets/twitter.svg")} alt="twitter" />Sign In With Twitter</button>

                            <br/>

                        </div>
=======
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

>>>>>>> 771ef768ea4b63cf126185dbba99f70daca6dd83
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
