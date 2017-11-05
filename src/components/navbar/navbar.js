import React, { Component } from 'react';
import { Link } from "react-router-dom";
import routes from "../../routes";

import './navbar.css';
import './../../helpers.css'


export default class Navbar extends Component {
    render() {
        return (
            <div className="App">
		        <header className="nav-header nunito-text t">
		          <Link to ="/">
		            <img src={require('./assets/home.svg')} alt ="Home"/>
		          </Link>
		          <Link to ="/explore">
		            <img src={require('./assets/explore.svg')} alt ="Explore"/>
		          </Link>
		          <Link to = "/user">
		            <img src={require('./assets/settings.svg')} alt ="Settings"/>
		          </Link>
		        </header>
        		<div>{routes}</div>
      		</div>
        );
    }
}