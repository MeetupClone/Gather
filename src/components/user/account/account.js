import React, {Component} from 'react';

import './account.css';

import {Notifications} from './notifications/notifications';
import {Preferences} from './preferences/preferences';
import {EditInfo} from './editInfo/editInfo';
import {InfoPage} from './info/infoPage';

export default class Account extends Component{
    constructor(props){
        super(props);

        this.state = {
            userId: "",
            accountState: 1,

        }
    }


    render(){

        switch(this.state.accountState){
            case 1:
            return(
                <div className="account-main-container">
                    <div className="account-left-navbar">
                        <ul className="account-left-options">
                            <li onClick={(e) => this.setState({ accountState: 1})}>Notifications</li>
                            <li onClick={(e) => this.setState({ accountState: 2})}>Preferences</li>
                            <li onClick={(e) => this.setState({ accountState: 3})}>Edit Info</li>
                            <li onClick={(e) => this.setState({ accountState: 4})}>Info Page</li>
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
                            <li onClick={(e) => this.setState({ accountState: 4})}>Info Page</li>
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
                            <li onClick={(e) => this.setState({ accountState: 4})}>Info Page</li>
                        </ul>
                    </div>
                    <div className="account-right-content">
                    <EditInfo/>
                    </div>
                </div>
            )
            case 4:
            return(
                <div className="account-main-container">
                    <div className="account-left-navbar">
                        <ul className="account-left-options">
                            <li onClick={(e) => this.setState({ accountState: 1})}>Notifications</li>
                            <li onClick={(e) => this.setState({ accountState: 2})}>Preferences</li>
                            <li onClick={(e) => this.setState({ accountState: 3})}>Edit Info</li>
                            <li onClick={(e) => this.setState({ accountState: 4})}>Info Page</li>
                        </ul>
                    </div>
                    <div className="account-right-content">
                    <InfoPage/>
                    </div>
                </div>
            )
        }
        

    }
}