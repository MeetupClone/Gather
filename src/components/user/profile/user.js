import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import axios from "axios";

import { fire as firebase } from "../../../fire"

import "./profile.css"

import ImageEngine from "./imageEngine"

import EditableProfile from "../editableProfile/editableProfile";

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
            showParams: 'events',
            userEvents: [],
            userAttending: [],
            userGroups: []
        };
    }




    componentWillMount() {

        let userId = localStorage.getItem('uid')
        // firebase.auth().onAuthStateChanged(user => {
        if (userId) {
            this.setState({
                uid: userId
            })
            axios.get(`/api/event/user/${userId}`).then(results => console.log(results)).catch(err => console.log(err))
            axios.get(`/api/event/getAttendingEvents/${userId}`).then(results => console.log(results)).catch(err => console.log(err))
            axios.get(`/api/group/user/${userId}`).then(results => console.log(results)).catch(err => console.log(err))
            axios.get(`/api/user/getUserInfo/${userId}`).then(result => {
                this.setState({
                    userProfilePic: result.data[0].profile_image,
                    userName: result.data[0].name,
                    userLocation: result.data[0].location,
                    userDescription: result.data[0].description
                })
            })

        }
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
                <Link to="/user/edit" onClick={() => this.setState({editable: true})} > Edit Profile</Link>
                <ImageEngine ImgSrc={this.state.userProfilePic} />
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