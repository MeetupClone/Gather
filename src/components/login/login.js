import React, { Component } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { fire as firebase } from "../../fire"

import "./login.css";
import "../../helpers.css";

import { loginWithEmailPassword, authWithFacebook, authWithTwitter, authWithGoogle, signOut } from "../../ducks/authentication-redux"

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            email: '',
            authenticated: false
        }
        firebase.auth().onAuthStateChanged(user => {
            console.log()
            if (user) {
                this.setState({
                    uid: user.uid,
                    email: user.email,
                    authenticated: true
                })
            }
        })
    }

    signOut() {
        firebase.auth().signOut().then(result => {
            this.setState({
                authenticated: false
            })
        })
    }

    render() {
        const { loginWithEmailPassword, authWithFacebook, authWithTwitter, signOut } = this.props;
        if (this.state.authenticated) {
            return (
                <div>
                <button className="buttons" onClick= {(event) => this.signOut()}> Log Out </button>
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

                                loginWithEmailPassword(this.emailInput.value, this.passwordInput.value)}}>Log In </button>
                            <Link to="/register">
                            <button className="register-button box-shadow">Register </button>
                            </Link>
                        </form>
                        <div id="providers-auth" className="center">
                            <button className="auth-button google box-shadow" onClick={()=> {authWithGoogle() }}><img className="auth-icon" src={require( "./assets/google.svg")} alt="Google" />Sign In With Google </button>
                            <button className="auth-button facebook box-shadow" onClick={()=> {authWithFacebook() }}><img className="auth-icon" src={require( "./assets/facebook.svg")} alt="facebook" /> Sign In With Facebook </button>
                            <button className="auth-button twitter box-shadow" onClick={()=> {authWithTwitter()}}><img className="auth-icon" src={require( "./assets/twitter.svg")} alt="twitter" />Sign In With Twitter</button>

                            <br/>

                        </div>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return state.AuthenticationReducer
}



const actions = {
    loginWithEmailPassword,
    authWithFacebook,
    authWithTwitter,
    signOut
}

export default connect(mapStateToProps, actions)(Login);