import React, { Component } from 'react';
import { Link } from "react-router-dom";
import routes from "../../routes";
import { fire as firebase } from "../../fire"

import './navbar.css';
import './../../helpers.css'


export default class Navbar extends Component {
    constructor(props){
        super(props)

        this.state = {
            authenticated: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                this.setState({authenticated: true})
            }
        })
    }

    render() {
        let accountButton = null
        if (this.state.authenticated) {
                accountButton = (<Link to = "/user">
                    <img src={require('./assets/settings.svg')} alt ="Settings"/>
                  </Link>)
            } else {
                accountButton = (<Link to = "/login">
                     Log In 
                  </Link>)
            }
        return (
            <div className="App">
		        <header className="nav-header nunito-text">
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