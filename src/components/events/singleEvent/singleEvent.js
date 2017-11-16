import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./singleEvent.css"

import { joinEvent, leaveEvent } from "../../../ducks/event-redux"

import { fire as firebase } from "../../../fire"

import {EventComment} from "../comments/eventComment"

export class SingleEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventId: this.props.match.params.id,
            eventName: '',
            eventDate: '',
            eventLocation: '',
            eventDescription: '',
            eventPic: '',
            organizerUid: '',
            currentUserUid: '',
            userAttendingEvents: [],
            joined: false,
            eventMembers: 0,
        }
    }

    componentWillMount() {

        axios.get(`/api/event/${this.state.eventId}`).then(response => {
            console.log(response)
            this.setState({
                eventName: response.data[0].title,
                eventLocation: response.data[0].location,
                eventDescription: response.data[0].description,
                eventPic: response.data[0].event_image,
                eventDate: response.data[0].date,
                organizerUid: response.data[0].organizer_uid,
                eventMembers: response.data[0].members
            })
        })

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ currentUserUid: user.uid })
                let eventsArr = []
                return axios.get(`/api/event/getAttendingEventsData/${this.state.currentUserUid}`).then(result => {
                    result.data.map(event => {
                        eventsArr.push(event.event_id)
                    })
                    this.setState({ userAttendingEvents: eventsArr })
                    if (this.state.userAttendingEvents.includes(this.state.eventId)) {
                        this.setState({ joined: true })
                    } else {
                        this.setState({ joined: false })
                    }
                })
            } 
        })
    }

    render() {
        const { joinEvent } = this.props
        let joinButton = null
        let leaveButton = null
 
        if (this.state.currentUserUid === this.state.organizerUid)
            {
            joinButton = (
                <div>
                    <h1> This is your event! </h1>
                    <Link to={`/event/edit/${this.props.match.params.id}`}><button className="edit-event-button" onClick={() => {this.setState({edit:true})}}> Click here to edit your event. </button></Link>
                </div>
                )
        } else {
            joinButton = (
                <div>
                    <button className="join-event-button" onClick={(event) => {joinEvent(this.state)}}> Join Event </button>
                </div>
                )
        }

        return (
            <div>
                {joinButton} 
                {leaveButton}
                    <h1>{this.state.eventName}</h1>
                    <img src={this.state.eventPic} alt={this.state.eventName}></img>
                    <h3>{this.state.eventLocation}</h3>
                    <h3>{this.state.eventDate}</h3>
                    <h3>{this.state.eventMembers} Member(s)</h3>
                    <p>{this.state.eventDescription}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => { return {} }

const actions = {
    joinEvent,
    leaveEvent
}

export default connect(mapStateToProps, actions)(SingleEvent)