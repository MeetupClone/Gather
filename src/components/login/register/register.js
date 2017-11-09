import React, { Component } from "react";

import { connect } from "react-redux";

import { authWithEmailPassword, authWithFacebook } from "../../../ducks/authentication-redux";

import "../login.css";
import Category from "../../categories/category"

export class Register extends Component {
    constructor(props) {
        super(props);


        this.state = {
            email: '',
            password: '',
            name: '',
            authenticated: false,
            categoriesAdded: false,
            categories: []
        }

        this.updateParent = (state) => this.props.updateParent(this.state)
    }

    render() {
        let createButton = null

        if (this.state.categoriesAdded) {
            createButton = (<button className="login-button box-shadow" onClick={(event) => {
                event.preventDefault()
                authWithEmailPassword(this.state)}}> Create Account </button>)
        } else {
            createButton = (<button className="login-button box-shadow"> Add Categories to Create an Account </button>)
        }
    
        const {
            authWithEmailPassword,
            authWithFacebook,
        } = this.props
        return (
            <div id="register-page">
            <h1 id="register-title"> Register </h1> 

                <input name="name" type="name" onChange={(event) => this.setState({name: event.target.value})} placeholder="Name"/>
                <input name="email" type="email" onChange={(event) => this.setState({email : event.target.value})} placeholder="Email"/>
                <input name="password" type="password" onChange={(event) => this.setState({password: event.target.value})} placeholder="Password"/>
                <Category className="categorySelector" updateParent={(state) => {
                this.setState({categoriesAdded : true, categories: state})}}/>
                {createButton}
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