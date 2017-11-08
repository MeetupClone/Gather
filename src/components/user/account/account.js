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
            notifications: true,
            preferences: [],
            userCat: []
        }


        this.changeView = this.changeView.bind(this)
    }

    changeView(val){
        this.setState({accountState: val})
    }

    componentWillMount(){
        
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid,
                    email: user.email
                })
                axios.get(`/api/user/account/getPref/${this.state.uid}`)
                   .then(result => {
                        this.setState({notifications: result.data.notification_settings, preferences: result.data.preference_settings})
                })
                    .catch(err => console.log("getPref error", err))
                
                axios.get(`/api/user/account/getCat/${this.state.uid}`)
                    .then(result => {
                        this.setState({userCat: result.data})
                })
                    .catch(err => console.log("getCat", err))
            }
            else{
                console.log("no user")
            }
        })
    }
    
    render(){

        //fiddle with this!

        let displayMe = null;

        switch(this.state.accountState){
            case 1:
            displayMe = (<Notifications notifications={this.state.notifications} uid={this.state.uid}/>)
            break;

            case 2:
            displayMe = (<Preferences preferences={this.state.preferences} uid={this.state.uid} userCat={this.state.userCat}/>)
            break;
        }
            return(
                <div className="account-main-container">
                    <div className="account-left-navbar">
                        <ul className="account-left-options">
                            <li onClick={(e) => this.changeView(1)}>Notifications</li>
                            <li onClick={(e) => this.changeView(2)}>Preferences</li>
                            <li>Link to Logout</li>
                        </ul>
                    </div>
                    <div className="account-right-content">
                    {displayMe}
                    </div>
                </div>
                )

        

    }
}
