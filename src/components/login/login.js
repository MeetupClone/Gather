import React, { Component } from "react";

import { Link } from "react-router-dom";

import { fire, facebookProvider, twitterProvider } from "../../fire"

import "./login.css";
import "../../helpers.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false
        }

        this.signOut = this.signOut.bind(this);
        this.loginWithEmailPassword = this.loginWithEmailPassword.bind(this);
        this.getAuthInfo = this.getAuthInfo.bind(this);
        this.authWithFacebook = this.authWithFacebook.bind(this);
    }

    authWithFacebook() {
        fire.auth().signInWithRedirect(facebookProvider)
            .then((result, error) => {
                console.log("logged in")
                if (error) {
                    console.log(error)
                } else {
                    console.log(this.state)
                }
            })
    }

    authWithTwitter() {
        fire.auth().signInWithRedirect(twitterProvider)
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
        const password = this.emailInput.value

        fire.auth().signInWithEmailAndPassword(email, password)
            .then(result => {
                console.log(result)
            })
    }

    getAuthInfo() {
        fire.auth().onAuthStateChanged(user => {
            if (user) {

                console.log(user)
            } else {

                console.log("no user")
            }
        })
    }

    signOut() {
        fire.auth().signOut().then(result => {

            console.log(result, "logged out")
        })
    }

    render() {
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