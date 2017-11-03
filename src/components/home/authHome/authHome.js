import React, { Component } from 'react';
import { fire as firebase } from "../../../fire"

import axios from "axios";

import { Link } from 'react-router-dom';


export default class AuthHome extends Component {
    constructor(props) {
        super(props)


        this.state = {
            uid: '',
            userEvents: '',
            userGroups: ''
        }


    }

    componentWillMount() {
        let eventArr = []
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ uid: user.uid })
            return axios.get(`/api/event/getAttendingEvents/${this.state.uid}`).then(result => {
                result.data.map(event => {
                    axios.get(`/api/event/${event.event_id}`).then(result => {
                        eventArr.push(result.data[0])
                    })
                })
            })
        })
        this.setState({ userEvents: eventArr })
    }



    render() {
    	let events = this.state.userEvents

    	console.log(events)

    	for (var key of this.state.userEvents){
    		console.log(key)
    	}

    	this.state.userEvents.map(x => {
    		console.log(x.title, x.category)
    	})
        return (
            <div>{this.state.userEvents.map(function(event){
                    return(
                        <div className="event-card-container" id="canvas">
                        <div className="event-card-content-container">
                            <img className="event-card-pic" src={event.event_image} alt="pic not working"/>
                            <Link to={`/event/${event.id}`}><p>Title: {event.title}</p></Link>
                            <p className="event-card-category">Category: {event.category}</p>
                            <p className="event-card-loc">Location: {event.location}</p>
                            <p className="event-card-desc">Description: {event.description}</p>
                        </div>
                        </div>
                    )
                }
                )}
                </div>
        )

    }
}