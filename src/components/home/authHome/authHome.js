import React, { Component } from 'react';
import { fire as firebase } from "../../../fire"
import './authHome.css'
import '../../../helpers.css'

import { Link } from 'react-router-dom';
import Footer  from '../../footer/footer'

import axios from 'axios';
import EventsYouMayLike from './eventsYouMayLike/eventsYouMayLike';

import "../../../components/events/explore/exploreSearch/eventCards/eventCards.css"



export default class AuthHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: "",
            userEvents: [],
            recEvents: [],
        }




        this.componentWillMount = this.componentWillMount.bind(this)

    }



    componentWillMount() {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid
                })
                axios.get(`/api/event/user/${this.state.uid}`).then(result => this.setState({ userEvents: result.data }))
            }
        })


    }


    render() {



        return (
            <div>
                <div>
                <h3>Your Events</h3>
                    {this.state.userEvents.map(key => {
                        return(
                            <div key={key.id} className="auth-event-card-info nunito-text">
                                <div className="auth-event-card-loc">{key.location.toUpperCase()}</div>
                                <div>{key.data}</div>
                                <div><Link to = {`/event/${key.id}`} className="auth-link">{key.title}</Link></div>
                                <div>{key.category}</div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <EventsYouMayLike/>
                </div>
                <Footer/>
            </div>
        )

    }
}