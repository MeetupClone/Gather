import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import axios from "axios";

import { fire as firebase } from "../../../fire"

import "./profile.css"
import '../../../helpers.css'
import Footer from '../../footer/footer'

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
            prefSettings: false,
            showParams: 'events',
            userEvents: [],
            userAttending: [],
            userGroups: []
        };

        this.addRipple = this.addRipple.bind(this)
    }

    addRipple(event){
        event.target.classList.add('clicked')
    }

    componentDidMount() {
        if (localStorage.getItem('uid')) {
            
            let user = localStorage.getItem('uid')
            console.log(this.state.uid)
            axios.get(`/api/event/user/${user}`).then(result => { this.setState({ userEvents: result.data }) })
                axios.get(`/api/event/getAttendingEventsData/${user}`).then(result => {
                    this.setState({ userAttending: result.data })
                }).catch(error => {
                    console.log(error)
                })
                axios.get(`/api/group/user/${user}`).then(result => { this.setState({ userGroups: result.data }) })
                axios.get(`/api/user/getUserInfo/${user}`).then(result => {
                    console.log(result)
                    this.setState({
                        userProfilePic: result.data[0].profile_image,
                        userName: result.data[0].name,
                        userLocation: result.data[0].location,
                        userDescription: result.data[0].description,
                        uid: user.uid
                    })
                })
                axios.get(`/api/user/account/getPref/${user}`).then(result => this.setState({prefSettings: result.data.preference_settings}))
        } else {
            firebase.auth().onAuthStateChanged(user => {
                axios.get(`/api/event/user/${user.uid}`).then(result => { this.setState({ userEvents: result.data }) })
                axios.get(`/api/event/getAttendingEventsData/${user.uid}`).then(result => {
                    this.setState({ userAttending: result.data })
                }).catch(error => {
                    console.log(error)
                })
                axios.get(`/api/group/user/${user.uid}`).then(result => { this.setState({ userGroups: result.data }) })
                axios.get(`/api/user/getUserInfo/${user.uid}`).then(result => {
                    console.log(result.data)
                    this.setState({
                        userProfilePic: result.data[0].profile_image,
                        userName: result.data[0].name,
                        userLocation: result.data[0].location,
                        userDescription: result.data[0].description,
                        uid: user.uid
                    })
                })
                axios.get(`/api/user/account/getPref/${user}`).then(result => this.setState({prefSettings: result.data.preference_settings}))

            })
        }
    }

    render() {
        let $userDescription = null
        let $userLoc = null
        if(this.state.prefSettings){
        if (!this.state.userDescription) { 
            $userDescription = (<div className=" nunito-text">
                <h5> Consider adding a description so people can learn more about you.
                </h5>
                </div>)
            $userLoc = this.state.userLocation    
        } else {
            $userDescription = (<p className="user-description nunito-text"> {this.state.userDescription} </p>)
        }
        }

        if (localStorage.getItem('uid')) {
            let $userGroupsEvents = null;
            if (this.state.showParams === "events") {
                if (!this.state.userEvents.length) {
                    $userGroupsEvents = (
                        <div> 

                        <h1> You haven't created any events!</h1>
                        <Link to="/event/create"><button> Create an Event </button>  </Link>
                        </div>)
                } else {
                    $userGroupsEvents = this.state.userEvents.map(key => {
                        return (
                            <Link to = {`/event/${key.id}`}>
                            <div key={key.id} className="event-card-container  nunito-text">
                            <div className="event-card-date nunito-text">
                                {key.event_date}
                            </div>
                            <div  className="event-card-info nunito-text">
                                <div className="event-card-loc">{key.location.toUpperCase()}</div>
                                <div>{key.title}</div>
                                <div>{key.category}</div>
                                <div className="event-card-desc"><p>{key.description}</p></div>
                            </div>
                            </div>
                            </Link>
                        )
                    })
                }
            } else if (this.state.showParams === "attending") {
                if (!this.state.userAttending.length) {
                    $userGroupsEvents = (
                        <div> 
                        <h1> You haven't joined any events!</h1>
                        <Link to="/explore"><button> Find Some Events </button>  </Link>
                        </div>)
                } else {
                    $userGroupsEvents = this.state.userAttending.map(key => {
                        return (
                            <Link to = {`/event/${key.id}`}>
                            <div key={key.id} className="event-card-container nunito-text">
                            <div className="event-card-date nunito-text">
                                {key.event_date}
                            </div>
                            <div  className="event-card-info nunito-text">
                                <div className="event-card-loc">{key.location.toUpperCase()}</div>
                                <div>{key.title}</div>
                                <div>{key.category}</div>
                                <div className="event-card-desc"><p className="overflow">{key.description}</p></div>
                            </div>
                            </div>
                            </Link>
                        )
                    })
                }
            } else if (this.state.showParams === "groups") {
                if (!this.state.userGroups.length) {
                    $userGroupsEvents = (<div className=" nunito-text"> 

                        <h1> You haven't joined any groups!</h1>
                        <Link to="/explore"><button> Join some Groups </button></Link>
                        <br/>
                        <Link to="/groups/create"><button> Create a Group! </button></Link>
                        </div>)
                } else {
                    $userGroupsEvents = this.state.userGroups.map(key => {
                        return (
                            <Link to = {`/groups/${key.id}`}>
                            <div key={key.id}>
                    <div className="user-prof-group-name nunito-text">{key.name}</div>
                    <div className="user-prof-group-page nunito-text">{key.website}</div>
                    </div>
                    </Link>
                        )
                    })
                }
            }
            if (this.state.editable) {
                return (
                    <EditableProfile/>
                )
            } else {
                return (
                    <div>
                
                <div>
                <img className="user-profile-pic" src={this.state.userProfilePic || 'https://firebasestorage.googleapis.com/v0/b/gatherv0-b3651.appspot.com/o/defaultPic.webp?alt=media&token=73d67fbf-6f0e-40aa-8fc9-15ec9e8e4fd9'} alt={this.state.userName}/>
                </div>
                <h1> {this.state.userName} </h1>
                <h3> {$userLoc} </h3>

                <p className="user-description nunito-text"> {this.state.userDescription} </p>

                <button className="edit-button" onClick={() => this.setState({editable: true})} >Edit Profile</button>

                <div className="user-spec-buttons">
                <button className="user-spec-button-indiv btn-active nunito-text" onClick={(event) => 
                    {this.setState({showParams: "events" })}}> Events </button>
                <button className="user-spec-button-indiv btn-active nunito-texte" onClick={() => 
                    {this.setState({showParams: "attending" })}}> Attending </button>
                <button className="user-spec-button-indiv btn-active nunito-text" onClick={() => 
                    {this.setState({showParams: "groups" })}}> Groups </button>
                </div>
                {$userGroupsEvents}
                <div>
                <Link to ="/user/account"><button className="account-button  nunito-text" onClick={() => this.setState({accountSettings: true})} >Edit Account</button></Link>
                </div>

                <Footer/>
                </div>
                )
            }
        } else {
            return(
                <div>
                <h1> How'd you get here!?!</h1>
                <br/>
                <h3> You need to be logged in to be able to edit your profile. </h3>
                <br/>
                <button><Link to='/login'> Login or Create an account here. </Link> </button> 
                </div> 
                )
        }
    }
}