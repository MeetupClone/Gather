import React, { Component } from "react";

import "./register.css";

export default class Register extends Component {
    render() {
        return (
            <div>
        		<h1> Sign Up For An Account </h1>

        		<h3> Name </h3>
        		<input className="registerInputBorder" type="text" />

        		<h3> Email </h3>
        		<input className="registerInputBorder" type="email" /> 

        		<h3> Password </h3>
        		<input className="registerInputBorder" type="password" />
        	</div>
        );
    }
}