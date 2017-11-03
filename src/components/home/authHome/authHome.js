import React, { Component } from 'react';
import { fire as firebase } from "../../../fire"

import axios from "axios";


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
                        eventArr.push(result.data)
                    })
                })
            })
        })
        this.setState({ userEvents: eventArr })
    }



    render() {
        let events = this.state.userEvents
        let eventCard = null;

        eventCard = events.map(event => {
            console.log(event)
            return (<h1> {event[0].title} </h1>)
        })


        return (
            <div>
            	{eventCard}
            	Authorized mother fucker
            	
            </div>
        )
    }
}