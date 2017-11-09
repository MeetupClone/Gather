import React, { Component } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { fire as firebase } from "../../fire";


import "./login.css";
import "../../helpers.css";

import { loginWithEmailPassword, authWithFacebook } from "../../ducks/authentication-redux"

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            password: '',
            name:'', 
            email: '',
            authenticated: false,
        }
        // firebase.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         this.setState({
        //             uid: user.uid,
        //             email: user.email,
        //             authenticated: true
        //         })
        //     }
        // })
    }

    signOut() {
        firebase.auth().signOut().then(result => {
            this.setState({
                authenticated: false
            })
        })
    }

    componentWillReceiveProps(x,y){
        
    }

    render() {
        console.log(this.props)
        const { loginWithEmailPassword, authWithFacebook } = this.props;
        if (this.state.authenticated) {
            return (
                <div>
                <button className="buttons" onClick= {(event) => this.signOut()}> Log Out </button>
                </div>
            )
        } else {
            return (
                <div id="login-page">
                    <h1 className="loginLogo">GATHER</h1>
                    <h3>LOG IN </h3>
                    <img src="images/logo-192.png" alt="gatherLogo" height="100" width="100"/>
                    <br/>
                        <form onSubmit={(event)=> { 
                            event.preventDefault();
                            loginWithEmailPassword(this.emailInput.value, this.passwordInput.value)}}>
                            <input name="email" type="email" onChange={(event) => {this.setState({email: event.target.value})}} placeholder="Email"/>
                            <input name="password" type="password" onChange={(event) => {this.setState({password: event.target.value})}} placeholder="Password"/>
                            <button className="login-button box-shadow" onClick={(event)=> {
                                event.preventDefault()

                                loginWithEmailPassword(this.state)}}>SIGN IN </button>

                                loginWithEmailPassword(this.state).then(result => {
                                    this.props.history.push('/')
                                })}}>Log In </button>

                            <Link to="/register">
                            <button className="auth-button facebook box-shadow" onClick={()=> {authWithFacebook() }}><img className="auth-icon" src={require( "./assets/facebook.svg")} alt="facebook" /> Sign In With Facebook </button>
                            <br/>
                            <br/>
                            <br/>
                            <button className="register-button box-shadow"> CREATE AN ACCOUNT </button>
                            </Link>
                        </form>
                        <div id="providers-auth" className="center">
                            
                            <Link to="/forgotpassword">
                            <button className="forgot-password-button">Forgot Password</button>
                            </Link>
                        </div>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {}
}



const actions = {
    loginWithEmailPassword,
    authWithFacebook,
}

export default connect(mapStateToProps, actions)(Login);