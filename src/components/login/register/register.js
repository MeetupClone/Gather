import React, { Component } from "react";


import { fire, facebookProvider } from "../../../fire";

import "./register.css";

export default class Register extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            authenticated: false
        }
    }


    authWithFacebook() {
        fire.auth().signInWithRedirect(facebookProvider)
            .then((result, error) => {
                if (error) {
                    console.log(error)
                } else {
                    this.setState({ redirect: true})
                    console.log(this.state)
                }
            })
    }

    authWithEmailPassword(event) {
        event.preventDefault()
        const email = this.emailInput.value
        const password = this.emailInput.value

        fire.auth().createUserWithEmailAndPassword(email, password).then(result => {
          console.log(result)
        })
        .catch(error => {
          console.log(error)
        })
    }

    render() {

        return (
            <div>
            <h1> Register Page </h1>
           
           <h3> Sign Up With Facebook </h3>

            <button onClick={() => {this.authWithFacebook() }}> Login With Facebook </button>
            <hr style={{marginTop: '10px', marginBottom:'10px'}}/>


             <h1> Sign Up With Your Email</h1>
            <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
            Email
            <input style={{width:"100%"}} name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="email"/>
          
          <br/>
          <br/>
          <br/>
          
            Password
            <input style={{width:"100%"}} name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="password"/>
          <br/>

          <button onClick={(event) => {this.authWithEmailPassword(event)}}> Create Account </button>
            </form>
          </div>
        );
    }
}