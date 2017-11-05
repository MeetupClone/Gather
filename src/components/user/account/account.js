import React, {Component} from 'react';

import './account.css';

import axios from 'axios';

import {Notifications} from './notifications/notifications';
import {Preferences} from './preferences/preferences';
import {EditInfo} from './editInfo/editInfo';
import { fire as firebase} from "../../../fire"


export default class Account extends Component{
    constructor(props){
        super(props);

        this.state = {
            uid: "",
            accountState: 1,
            email: "",
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid,
                    email: user.email,
                    authenticated: true,
                    preferences: [],
                    categories: []
                })
            }
            else{
                console.log("no user")
            }
        })

        this.componentWillMount = this.componentWillMount.bind(this)
    }

    // make a database call for user information and then pass it to kids
    componentWillMount(){
        console.log(this.state.uid)
        axios.get(`/api/user/account/getPref/${this.state.uid}`)
        .then(result => console.log("getPref", result))
        .catch(err => console.log("getPref error", err))
        
        axios.get(`/api/user/account/getCat/${this.state.uid}`)
        .then(result => console.log("getCat", result))
        .catch(err => console.log("getCat", err))

    }

    render(){
        console.log(this.state)
        switch(this.state.accountState){
            case 1:
            return(
                <div className="account-main-container">
                    <div className="account-left-navbar">
                        <ul className="account-left-options">
                            <li onClick={(e) => this.setState({ accountState: 1})}>Notifications</li>
                            <li onClick={(e) => this.setState({ accountState: 2})}>Preferences</li>
                            <li onClick={(e) => this.setState({ accountState: 3})}>Edit Info</li>
                            <li>Link to Logout</li>
                        </ul>
                    </div>
                    <div className="account-right-content">
                    <Notifications/>
                    </div>
                </div>
                )
            case 2:
            return(
                <div className="account-main-container">
                    <div className="account-left-navbar">
                        <ul className="account-left-options">
                            <li onClick={(e) => this.setState({ accountState: 1})}>Notifications</li>
                            <li onClick={(e) => this.setState({ accountState: 2})}>Preferences</li>
                            <li onClick={(e) => this.setState({ accountState: 3})}>Edit Info</li>
                            <li>Link to Logout</li>
                        </ul>
                    </div>
                    <div className="account-right-content">
                    <Preferences/>                    
                    </div>
                </div>
            )
            case 3:
            return(
                <div className="account-main-container">
                    <div className="account-left-navbar">
                        <ul className="account-left-options">
                            <li onClick={(e) => this.setState({ accountState: 1})}>Notifications</li>
                            <li onClick={(e) => this.setState({ accountState: 2})}>Preferences</li>
                            <li onClick={(e) => this.setState({ accountState: 3})}>Edit Info</li>
                            <li>Link to Logout</li>
                        </ul>
                    </div>
                    <div className="account-right-content">
                    <EditInfo/>
                    </div>
                </div>
            )
            default: 
            break;
        }

        

    }
}