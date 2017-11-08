import React, { Component } from "react";

import { connect } from "react-redux";

import { authWithEmailPassword, authWithFacebook } from "../../../ducks/authentication-redux";

import "../login.css";
import Category from "../../categories/category"

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
                <Category/>
                <button className="login-button box-shadow" onClick={(event) => {
                    event.preventDefault()
                    authWithEmailPassword(this.emailInput.value, this.passwordInput.value, this.nameInput.value)}}> Create Account </button>
            </form>
            <div id="providers-auth" className="center">
                            <button className="auth-button facebook box-shadow" onClick={(event)=> {
                                event.preventDefault();
                                authWithFacebook() }}>
                                <img className="auth-icon" src={require( "../assets/facebook.svg")} alt="facebook" /> Sign Up With Facebook </button>

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
    authWithFacebook
}

export default connect(mapStateToProps, actions)(Register);