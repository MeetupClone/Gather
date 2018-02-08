import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './eventsYouMayLike.css';
import 'helpers.css';

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
        axios.get(`/api/recommendedEvents/${this.props.uid}`).then(result => {
            console.log(result);
        });

        axios.get('/api/events').then(events => {
            this.setState({
                checked: true,
                events: events.data.sort((a, b) => {
                    return (
                        new Date(b.cron_time).getTime() <
                        new Date(a.cron_time).getTime()
                    );
                }),
            });
        });
    }

    render() {
        return !this.state.checked ? null : (
            <div>
                <h4>New Events</h4>
                {this.state.events.map((event, i) => {
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
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    }
}


