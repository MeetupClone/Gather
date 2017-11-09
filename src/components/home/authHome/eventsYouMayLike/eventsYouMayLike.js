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
                console.log(this.state)
                axios.get(`/api/relevant/event/${this.state.uid}`)
                    .then(results => {
                        console.log(results)
                        this.setState({ eventsArr: this.state.userEvents.concat(results.data) })
                    })
                    .catch(err => console.log("relevant event not working", err))


            } else {
                console.log("no user")
            }
        })


        this.state.eventsArr = _.uniq(this.state.eventsArr)
        console.log(this.state.eventsArr)
    }

    componentDidMount() {



    }


    render() {
        return (
            <div>
                    <h4>Events You May Like</h4>
                        {this.state.eventsArr.map(function(event, index){
                            if(index < 5){
                        return(
                            <div key={event.id + event.category_name}>
                                <div className="recc-events-card-info nunito-text">
                                <div className="recc-events-location">{event.location.toUpperCase()}</div>
                                <div>{event.title}</div>
                                <div>{event.category}</div>
                                </div>
                            </div>
                        )
                    }})}
                    </div>
        )
    }

}