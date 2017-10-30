import React, { Component } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { fire as firebase, facebookProvider, twitterProvider } from "../../fire"

import "./login.css";
import "../../helpers.css";

import { loginWithEmailPassword, getAuthInfo } from "../../ducks/login-redux"

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            email: '',
            authenticated: false
        }

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

    componentDidMount(){
        console.log(this.state)
    }

    signOut() {
        firebase.auth().signOut().then(result => {
            this.setState({
                authenticated: false
            })
            console.log(result, "logged out")
        })
    }

    render() {
        const { loginWithEmailPassword, getAuthInfo } = this.props;
        if (this.state.authenticated) {
            return (
                <div>
                <button className="buttons" onClick= {(event) => this.signOut()}> Log Out </button>
                <button onClick={(event) => this.getAuthInfo()}> Get Auth Info</button>
                </div>
            )
        } else {
            return (
                <div id="login-page">
                        <form onSubmit={(event)=> { 
                            event.preventDefault();
                            loginWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                            <input name="email" type="email" ref={(input)=> {this.emailInput = input}} placeholder="Email"/>
                            <input name="password" type="password" ref={(input)=> {this.passwordInput = input}} placeholder="Password"/>
                            <button className="login-button box-shadow" onClick={(event)=> {
                                event.preventDefault()

                                loginWithEmailPassword(this.emailInput, this.passwordInput)}}>Log In </button>
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
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => { return {} }

const actions = {
    loginWithEmailPassword,
    getAuthInfo
}

export default connect(mapStateToProps, actions)(Login);