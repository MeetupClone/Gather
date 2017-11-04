import React, { Component } from 'react';

import AuthHome from './authHome/authHome';
import NotAuthHome from './notAuthHome/notAuthHome';

import { fire as firebase } from "../../fire"


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: ''
        }

        firebase.auth().onAuthStateChanged(user => {
            this.setState({uid: user.uid})
        })

    }
    render() {
        let homeElement = null
        if (this.state.uid.length > 0) {
            homeElement = (<AuthHome/>)
        } else {
            homeElement = (<NotAuthHome/>)
        }
        return (
            <div>
                {homeElement}
            </div>
        );
    }
}