import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { joinEvent, leaveEvent } from "../../../ducks/event-redux"

import { fire as firebase } from "../../../fire"

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
            userAttendingEvents: []
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ currentUserUid: user.uid })
                axios.get(`/api/event/getAttendingEvents/${this.state.currentUserUid}`).then(result => {
                    result.data.map(x => {
                        this.state.userAttendingEvents.push(x.event_id)
                    })
                })
            }
        })
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        axios.get(`/api/event/${this.state.eventId}`).then(response => {
            this.setState({
                eventName: response.data[0].title,
                eventLocation: response.data[0].location,
                eventDescription: response.data[0].description,
                eventPic: response.data[0].event_image,
                eventDate: response.data[0].date,
                organizerUid: response.data[0].organizer_uid
            })
        })
    }

    render() {
        const { joinEvent, leaveEvent } = this.props
        let joinButton = null
        let leaveButton = null
        if (this.state.userAttendingEvents.includes(this.state.eventId)) {

            joinButton = (<button onClick={(event) => {
                joinEvent(this.state)
            }}> Join This Event </button>)
        } else {
            leaveButton = (<button onClick={(event) => {
                leaveEvent(this.state)
            }}> Leave Event </button>)
            joinButton = (<h1> You are going to this event! </h1>)
        }


        let editButton = null
        if (this.state.currentUserUid === this.state.organizerUid) {
            editButton = <Link to={`/event/edit/${this.state.id}`}> Edit Event </Link>
        }

        return (
            <div>
            {editButton}
                <h1>{this.state.eventName}</h1>
                <img src={this.state.eventPic} alt={this.state.eventName}></img>
                <h3>{this.state.eventLocation}</h3>
                <h3>{this.state.eventDate}</h3>
                <p>{this.state.eventDescription}</p>
                {leaveButton}
                {joinButton}   
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