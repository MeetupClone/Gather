import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fire as firebase } from '../../../../fire';

import './eventsYouMayLike.css';
import '../../../../helpers.css';

export default class EventsYouMayLike extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            reccEvents: [],
            userEvents: [],
            eventsArr: [],
            checked: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid,
                });
                axios.get(`/api/event/user/${this.state.uid}`).then(result =>
                    this.setState({
                        userEvents: result.data,
                        checked: true,
                    })
                );
                axios
                    .get(`/api/relevant/event/${this.state.uid}`)
                    .then(results => {
                        this.setState({
                            reccEvents: results.data,
                            checked: true,
                        });
                    })
                    .catch(console.log);
            }
        });
    }

    render() {
        let eventCat = null;

        return !this.state.checked ? null : (
            <div>
                <h4>Events You May Like</h4>
                {this.state.reccEvents.map((event, i) => {
                    if (i < 5) {
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
                    }
                })}
            </div>
        );
    }
}
