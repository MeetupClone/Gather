import React, { Component } from "react";


import { fire as firebase, facebookProvider, twitterProvider } from "../../../fire";

import "../login.css";

import axios from "axios"

export default class Register extends Component {
    constructor(props) {
        super(props);


        this.state = {
            uid: '',
            email: '',
            name: '',
            authenticated: false
        }

        this.authWithFacebook = this.authWithFacebook.bind(this)
        this.authWithTwitter = this.authWithTwitter.bind(this);
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
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

    authWithFacebook() {
        firebase.auth().signInWithRedirect(facebookProvider)
            .then((result, error) => {
                if (error) {
                    console.log(error)
                } else {
                    this.setState({ redirect: true })
                    console.log(this.state)
                }
            })
    }

    authWithEmailPassword(event) {
        event.preventDefault();
        const name = this.nameInput.value
        const email = this.emailInput.value
        const password = this.passwordInput.value

        console.log(email,name,password)

        firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {

                this.setState({
                    uid: user.uid,
                    email: user.email,
                    name: name,
                    authenticated: true
                })

                let userInfo = [user.uid, user.email, name]
                axios.post('/api/user/createUser', userInfo)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        return (
            <div id="register-page">
            <h1> Register </h1> 
            <form className="center" onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                <input name="email" type="email" ref={(input) => {this.nameInput = input}} placeholder="Name"/>
                <input name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="Email"/>
                <input name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="Password"/>
                <button className="login-button box-shadow" onClick={(event) => {this.authWithEmailPassword(event)}}> Create Account </button>
            </form>
            <div id="providers-auth" className="center">
                            <button className="auth-button google box-shadow"><img className="auth-icon" src={require( "../assets/google.svg")} alt="Google" />Sign Up With Google </button>
                            <button className="auth-button facebook box-shadow" onClick={()=> {this.authWithFacebook() }}><img className="auth-icon" src={require( "../assets/facebook.svg")} alt="facebook" /> Sign Up With Facebook </button>
                            <button className="auth-button twitter box-shadow" onClick={()=> {this.authWithTwitter()}}><img className="auth-icon" src={require( "../assets/twitter.svg")} alt="twitter" />Sign Up With Twitter</button>

                            <br/>

                        </div>
          </div>
        );
    }
}