import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { fire as firebase } from "../../../../fire"

import './eventsYouMayLike.css';
import '../../../../helpers.css';

// import {underscore as _} from 'underscore';

const _ = require("underscore")

export default class EventsYouMayLike extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uid: "",
            reccEvents: [],
            userEvents: [],
            eventsArr: []
        }




    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid
                })
                axios.get(`/api/event/user/${this.state.uid}`)
                    .then(result => this.setState({ userEvents: result.data }))
                axios.get(`/api/relevant/event/${this.state.uid}`)
                .then(results => {
                    this.setState({reccEvents: results.data})
                    console.log(this.state.reccEvents)
                })
                .catch(err => console.log("relevant event not working", err))
        
                
            }
            else{
                console.log("no user")
            }
        })

    }


    render() {
        let eventCat = null;
        
        return (
            <div>
                    <h4>Events You May Like</h4>
                        {this.state.reccEvents.map(function(event, index){
                            
                            if(event.category){
                                eventCat = event.category.charAt(0).toUpperCase() + event.category.slice(1);
                            }
                            if(index < 5){
                        return(
                            <div key={event.id + event.category_name}>
                                <div className="recc-events-card-info nunito-text">
                                <div className="recc-events-location">{event.location.toUpperCase()}</div>
                                <Link to = {`/event/${event.id}`}><div>{event.title}</div></Link>
                                {<div>{event.event_date}</div>}
                                <div>{eventCat}</div>
                                </div>
                            </div>
                        )
                    }})}
                    </div>
       )
    }

}