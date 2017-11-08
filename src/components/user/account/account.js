import React, {Component} from 'react';

import './account.css';

import axios from 'axios';

import { connect } from 'react-redux';
import { getAuthInfo } from "../../../ducks/authentication-redux"

import {Notifications} from './notifications/notifications';
import {Preferences} from './preferences/preferences';
import {EditInfo} from './editInfo/editInfo';
import { fire as firebase} from "../../../fire"


export class Account extends Component{
    constructor(props){
        super(props);

        this.state = {
            uid: this.props.uid,
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
    
    render(){
        //fiddle with this!

        let displayMe = null;

        switch(this.state.accountState){
            case 1:
            displayMe = (<Notifications uid={this.state.uid}/>)
            break;

            case 2:
            displayMe = (<Preferences uid={this.state.uid}/>)
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

const mapStateToProps = (state) => {
    return state.AuthenticationReducer
}

const actions = {
    getAuthInfo
}

export default connect(mapStateToProps, actions)(Account)
