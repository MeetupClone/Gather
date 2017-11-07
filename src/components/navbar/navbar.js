import React, { Component } from 'react';
import { Link } from "react-router-dom";
import routes from "../../routes";
import { fire as firebase } from "../../fire"

import './navbar.css';
import './../../helpers.css'


export default class Navbar extends Component {
    render() {
        let accountButton = null
        if (localStorage.getItem('userData')) {
            if (JSON.parse(localStorage.getItem('userData')).uid) {
                accountButton = (<Link to = "/user">
		            <img src={require('./assets/settings.svg')} alt ="Settings"/>
		          </Link>)
            } else {
                accountButton = (<Link to = "/login">
		             Log In 
		          </Link>)
            }
        } else {
        	firebase.auth().onAuthStateChanged(user => {
        		console.log(user)
        	})
        }
        return (
            <div className="App">
		        <header className="nav-header nunito-text t">
		          <Link to ="/">
		            <img src={require('./assets/home.svg')} alt ="Home"/>
		          </Link>
		          <Link to ="/explore">
		            <img src={require('./assets/explore.svg')} alt ="Explore"/>
		          </Link>
		          {accountButton}
		        </header>
        		<div>{routes}</div>
      		</div>
        );
    }
}