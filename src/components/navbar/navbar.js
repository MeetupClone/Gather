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

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                this.setState({authenticated: true})
            } else {
                this.setState({authenticated: false})
            }
        })
    }

    render() {
        console.log(this.props)
        let accountButton = null
        if (this.state.authenticated) {
                accountButton = (<Link to = "/user">
                    <img className="nav-icon" src={require('./assets/settings.svg')} alt ="Settings"/>
                  </Link>)
            } else {
                accountButton = (<Link className="nav-text" to = "/login">
                     Log In 
                  </Link>)
            }
        return (
            <div className="App">
                <div className="nav-header nunito-text">
                  <Link to ="/">
                    <img className="nav-icon" src={require('./assets/home.svg')} alt ="Home"/>
                  </Link>
                  <Link to ="/explore">
                    <img className="nav-icon" src={require('./assets/explore.svg')} alt ="Explore"/>
                  </Link>
                  {accountButton}
                </div>
                <div> {routes} </div>
            </div>
        );
    }
}