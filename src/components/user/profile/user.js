import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import axios from "axios";

import "./profile.css"

import EditableProfile from "../editableProfile/editableProfile";

import { fire as firebase } from "../../../fire";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            uid: '',
            userProfilePic: '',
            userName: '',
            userLocation: '',
            userDescription: '',
            editable: false,
            showParams: ''
        };
    }

    render() {

        let $userGroupsEvents = null;
        if (this.state.showParams === "events") {
            $userGroupsEvents = (<h1>Events</h1>)
        } else if (this.state.showParams === "attending") {
            $userGroupsEvents = (<h1>Attending Events</h1>)
        } else if (this.state.showParams === "groups") {
            $userGroupsEvents = (<h1>Groups</h1>)
        }
        if (this.state.editable) {
            return (
            <EditableProfile/>
            )
        } else {
            return (
                <div>
                <Link to="/user/edit" onClick={() => this.setState({editable: true})} > Edit </Link>
                <img className="user-profile-pic" src={this.state.userProfilePic} alt={this.state.userName}/>
                <h1> {this.state.userName} </h1>
                <h3> {this.state.userLocation} </h3>

                <p className="user-description">{this.state.userDescription}</p>

                <div className="user-spec-buttons">
                <button className="user-spec-button-indiv" onClick={() => 
                    {this.setState({showParams: "events" })}}> Events </button>
                <button className="user-spec-button-indiv" onClick={() => 
                    {this.setState({showParams: "attending" })}}> Attending </button>
                <button className="user-spec-button-indiv" onClick={() => 
                    {this.setState({showParams: "groups" })}}> Groups </button>
                </div>

                {$userGroupsEvents}


                </div>
            )
        }
    }
}