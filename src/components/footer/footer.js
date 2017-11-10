import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { fire as firebase } from "../../fire";

import "./footer.css";

export default class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: false,
            createButton: false,
            createButtonNonAuth: false
        }



    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: true,
                })
            }
        })
    }


    render() {
        let createButton = (<button className="footer-create-button" onClick={() => {this.setState({createButton: true})}}>Create</button>)
        let createEventButton = (<button className="inner-create-buttons" onClick={() => {
                if(!this.state.user){
                    this.setState({createButtonNonAuth: true})
                } else {
                    this.props.history.push('/event/create')
                }
            }}> Event
                </button>)
        let createGroupButton = (<button className="inner-create-buttons" onClick={() => {
                if(!this.state.user){
                    this.setState({createButtonNonAuth: true})
                } else {
                    this.props.history.push('/groups/create')
                }
            }}> Groups
                </button>)
        let loginButton = (<button className="footer-login-button" onClick={() => {this.props.history.push('/login')}}>Login</button>)
         if (this.state.createButton){
            createButton = (
                <div className="row-flex">
                {createEventButton}
                {createGroupButton}
                </div>
                )
        }
        if (this.state.createButtonNonAuth){
            createGroupButton = null;
            createEventButton = null;
            createButton = (
                <div>
                <h3 className="login-text"> You must be logged in to create an event or group.</h3>
                {loginButton}
                </div>
                 )
        }
       
            return (
                <div className="footer-all">
                    <div className="create-button-space">
                        {createButton}
                    </div>
                    <div className="footer-link-section">
                        <Link to="/faq" className="footer-links"> About </Link>
                    </div>
                </div>
            )
        
            

    }
}