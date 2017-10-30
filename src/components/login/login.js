import React, { Component } from "react";

import { Link } from "react-router-dom";

import { fire, facebookProvider, twitterProvider } from "../../fire"

import './login.css';

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
            <div className='body'>
                <h1 className='login'> Login Page </h1>

                     <div>
                        <Link to ="/register">
                        Register 
                        </Link>


            <button className='facebook' onClick={() => {this.authWithFacebook() }}> Login With Facebook </button>
            <hr style={{marginTop: '10px', marginBottom:'10px'}}/>


             <h3 className='login'> Sign In With Your Email</h3>
            <form onSubmit={(event) => { this.loginWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
            <input style={{width:"100%"}} name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="Email"/>
          <br/>
          <br/>
            <input style={{width:"100%"}} name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="Password"/>
          <br/>
          <br/>
          
          <button className='loginbutton' onClick={(event) => {this.loginWithEmailPassword(event)}}>Log In </button>
            </form>
            <br/>
            <br/>
                <hr style={{marginTop: '10px', marginBottom:'10px'}}/>    
                <br/>

                   
                        <button className='auth' onClick={(event) => this.getAuthInfo()}> Get Auth Info</button>
                        <br/>
                        
                        <button className='facebook' onClick={() => {this.authWithFacebook() }}> Login With Facebook </button>
                        <br/>
                        <button className='twitter' onClick={() => {this.authWithTwitter()}}>Login With Twitter</button>

                        <br/>
                        <button className='buttons' onClick= {(event) => this.signOut()}> Log Out </button>
                        <br/>

                    </div>
            
            </div>
        )
    }
}