import React, { Component } from 'react';

import { Link} from 'react-router-dom';

import axios from "axios";

import { fire as firebase } from "../../../fire"

import "./profile.css"

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
            accountSettings: false,
            showParams: 'events',
            userEvents: [],
            userAttending: [],
            userGroups: []
        };
    }
    // this.setState({userGroups: results.data})



    componentWillMount() {
        let userId = localStorage.getItem('uid')
        // firebase.auth().onAuthStateChanged(user => {
        if (userId) {
            this.setState({
                uid: userId
            })
            axios.get(`/api/event/user/${userId}`).then(result=> {this.setState({userEvents: result.data})})
            axios.get(`/api/event/getAttendingEventsData/${userId}`).then(result=> {
                this.setState({userAttending: result.data})}).catch(error => {
                    console.log(error)
                })
            axios.get(`/api/group/user/${userId}`).then(result=> {this.setState({userGroups: result.data})})
            axios.get(`/api/user/getUserInfo/${userId}`).then(result => {
                this.setState({
                    userProfilePic: result.data[0].profile_image,
                    userName: result.data[0].name,
                    userLocation: result.data[0].location,
                    userDescription: result.data[0].description,
                    uid: userId
                })
            })

        } else {

        }
    }

    render() {

        let $userGroupsEvents = null;
        if (this.state.showParams === "events") {
            $userGroupsEvents = this.state.userEvents.map(key => {
                return (
                    <div key={key.id}>
                   <Link to = {`/event/${key.id}`}>{key.title}</Link>
                    {key.event_date}
                    {key.location}    
                    </div>
                )
            })
        } else if (this.state.showParams === "attending") {
            $userGroupsEvents = this.state.userAttending.map(key => {
                return (
                    <div key={key.id}>
                    <Link to = {`/event/${key.id}`}>{key.title}</Link>
                    {key.event_date}
                    {key.location}    
                    </div>
                )
            })
        } else if (this.state.showParams === "groups") {
            $userGroupsEvents = this.state.userGroups.map(key => {
                return (
                    <div key={key.id}>
                    <Link to = {`/groups/${key.id}`}>{key.name}</Link>
                    {key.website}    
                    </div>
                )
            })
        }
        if (this.state.editable) {
            return (
                <EditableProfile/>
            )
        } else {
            return (
                <div>
                
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
                <div className="center-row fixed-bottom">
                    <button onClick={() => this.setState({editable: true})} >Edit Profile</button>
                    <Link to ="/user/account"><button onClick={() => this.setState({accountSettings: true})} >Edit Account</button></Link>
                    </div>
                </div>
            )
        }
    }
}