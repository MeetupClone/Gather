import React, { Component } from 'react';
import { fire as firebase } from 'fire';
import './authHome.css';
import 'helpers.css';

import { Link } from 'react-router-dom';
import Footer from 'components/footer/footer';

import axios from 'axios';
import EventsYouMayLike from './eventsYouMayLike/eventsYouMayLike';

import 'components/events/explore/exploreSearch/eventCards/eventCards2.css';

export default class AuthHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            userEvents: [],
            recEvents: [],
            loading: true,
        };

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid,
                });

                axios.get(`/api/event/user/${this.state.uid}`).then(result =>
                    this.setState({
                        loading: false,
                        userEvents: result.data,
                    })
                );
            }
        });
    }

    render() {
        let appShell = null;
        let keyCat = null;

        if (this.state.loading) {
            let arr = [];

            for (var i = 0; i < 8; i++) {
                arr.push(
                    <div key={i} className="home-page-loading-container" />
                );
            }
            appShell = arr;

            return (
                <div>
                    <h3 className="nunito-text">Your Events</h3>
                    {appShell}
                    <EventsYouMayLike />
                </div>
            );
        } else {
            return (
                <div>
                    <h3 className="nunito-text">Your Events</h3>
                    {this.state.userEvents.map((event, i) => {
                        return (
                            <Link key={i} to={`/event/${event.id}`}>
                                <div
                                    event={event.id}
                                    className="card-container nunito-text">
                                    <div>{event.title}</div>
                                    <div className="event-card-date nunito-text">
                                        {event.event_date}
                                    </div>
                                    <p className="event-card-desc">
                                        {event.description}
                                    </p>
                                    <p className="event-card-loc">
                                        {event.location.toUpperCase()}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}

                    <div className="recc-events-container">
                        <EventsYouMayLike />
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}
