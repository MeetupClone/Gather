import React, { Component } from 'react';

import { fire as firebase } from "../../../fire"
import { Link } from "react-router-dom"

import Footer from '.././../footer/footer'

import "./forgotPassword.css"

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            success: false,
            error: ''
        }
    }




    render() {
            let errorMessage = null
            let successMessage = null;
            let sendButton = (<button className="send-button" onClick={()=> {
	        		firebase.auth().sendPasswordResetEmail(this.state.email).then(result => {
            		if(!result){
            			this.setState({success: true})
            		}
        			}).catch(error => {
        				console.log(error)
        				this.setState({error: error.code})
        			});
	        	}}> Send me an Email </button>)
            if (this.state.error === "auth/invalid-email") {
                errorMessage = (<h3> That wasn't a valid email. </h3>)
            } else if (this.state.error ===
                "auth/user-not-found") {
                errorMessage = (<h3> That email doesn't exist.</h3>)
                sendButton = (<Link to='/register/'><button className="send-button"> Make an Account </button></Link>)
    	}

    	if (this.state.success){
    		successMessage =(<h3> We've sent you an email! </h3>)
    	}
    	
        return (
            <div>
        	<h2 className="main-header"> You forgot your password? That's okay.</h2>
        	<h3 className="sub-header"> It happens to the best of us.</h3>
        	<div className="form-group">
	        	<h5> Enter your email address below, and we'll email you instructions on how to change your password. </h5>
	        	<input className="form" onChange={(event) => {
	        		this.setState({email: event.target.value})
	        	}} />
	        	{errorMessage}
	        	{successMessage}
	        	{sendButton}
        	</div>

        	<Footer/>
        	</div>

        )
    }
}