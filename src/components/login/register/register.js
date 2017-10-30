import React, { Component } from "react";


import { fire as firebase, facebookProvider } from "../../../fire";

import "./register.css";

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
            <div>
            <h1> Register Page </h1>
           
           <h3> Sign Up With Facebook </h3>

            <button onClick={() => {this.authWithFacebook() }}> Login With Facebook </button>
            <hr style={{marginTop: '10px', marginBottom:'10px'}}/>


             <h3> Sign Up With Your Email</h3>
            <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
            Name
            <input style={{width:"100%"}} name="email" type="email" ref={(input) => {this.nameInput = input}} placeholder="name"/>
          <br/>
          <br/>
          <br/>
            Email
            <input style={{width:"100%"}} name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="email"/>
          
          <br/>
          <br/>
          <br/>
          
            Password
            <input style={{width:"100%"}} name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="password"/>
          <br/>
          <hr/>
          <br/>
          <button onClick={(event) => {this.authWithEmailPassword(event)}}> Create Account </button>
            </form>
          </div>
        );
    }
}