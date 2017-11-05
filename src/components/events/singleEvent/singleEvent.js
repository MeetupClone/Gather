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
            userAttendingEvents: [],
            joined: false
        }
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

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ currentUserUid: user.uid })
                let eventsArr = []
                axios.get(`/api/event/getAttendingEventsData/${this.state.currentUserUid}`).then(result => {
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
        let that = this;
        const { joinEvent, leaveEvent } = this.props
        let joinButton = null
        let leaveButton = null
        if (this.state.joined) {
            joinButton = (<h1> You are going to this event! </h1>)
            leaveButton = (<button onClick={(event) => {
                leaveEvent(this.state)
                that.setState({joined: false})
            }}> Leave Event </button>)
        } else {
            joinButton = (<button onClick={(event) => {
                joinEvent(this.state);
                that.setState({joined: true})
            }}> Join This Event </button>)

        }


        let editButton = null
        if (this.state.currentUserUid === this.state.organizerUid) {
            editButton = <Link to={`/event/edit/${this.props.match.params.id}`}> Edit Event </Link>
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