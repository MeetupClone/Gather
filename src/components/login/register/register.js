import React, { Component } from "react";

import { connect } from "react-redux";

import { authWithEmailPassword, authWithFacebook, authWithTwitter, authWithGoogle } from "../../../ducks/authentication-redux";

import "../login.css";


export class Register extends Component {
    constructor(props) {
        super(props);


        this.state = {
            uid: '',
            email: '',
            name: '',
            authenticated: false
        }
    }

    render() {
        const {
            authWithEmailPassword,
            authWithFacebook,
            authWithTwitter,
            authWithGoogle
        } = this.props
        return (
            <div id="register-page">
            <h1> Register </h1> 
            <form className="center" onSubmit={(event) => { 
                event.preventDefault();
                authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                <input name="email" type="email" ref={(input) => {this.nameInput = input}} placeholder="Name"/>
                <input name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="Email"/>
                <input name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="Password"/>
                <button className="login-button box-shadow" onClick={(event) => {
                    event.preventDefault()
                    authWithEmailPassword(this.emailInput.value, this.passwordInput.value, this.nameInput.value)}}> Create Account </button>
            </form>
            <div id="providers-auth" className="center">
                            <button className="auth-button google box-shadow" onClick={(event)=> {
                                event.preventDefault();
                                authWithGoogle()}}><img className="auth-icon" src={require( "../assets/google.svg")} alt="Google" />Sign Up With Google </button>
                            <button className="auth-button facebook box-shadow" onClick={(event)=> {
                                event.preventDefault();
                                authWithFacebook() }}>
                                <img className="auth-icon" src={require( "../assets/facebook.svg")} alt="facebook" /> Sign Up With Facebook </button>
                            <button className="auth-button twitter box-shadow" onClick={(event)=> {
                                event.preventDefault();
                                authWithTwitter()}}><img className="auth-icon" src={require( "../assets/twitter.svg")} alt="twitter" />Sign Up With Twitter</button>

                            <br/>

                        </div>
          </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {}
}



const actions = {
    authWithEmailPassword,
    authWithFacebook,
    authWithTwitter,
    authWithGoogle
}

export default connect(mapStateToProps, actions)(Register);