import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

import './eventCards2.css';
import 'helpers.css';

export class EventCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            searchFilter: 'name',
            searchText: '',
            searchField: 1,
            loading: true,
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        axios
            .get('/api/events')
            .then(result => {
                this.setState({
                    loading: false,
                    events: result.data.sort((a, b) => {
                        return (
                            new Date(b.cron_time).getTime() -
                            new Date(a.cron_time).getTime()
                        );
                    }),
                });
            })
            .catch(() => this.setState({ loading: false }));
    }

    handleSearch() {}

    render() {
        return this.state.loading ? (
            <div>
                {Array.apply(null, { length: 4 }).map((x, i) => {
                    return (
                        <div className="event-card-loading-container" key={i} />
                    );
                })}
            </div>
        ) : (
            <div>
                {this.props.events.map((event, i) => {
                    return (
                        <Link key={i} to={`/event/${event.id}`}>
                            <div className="card-container">
                                <p>{event.title}</p>
                                <p className="event-card-desc">
                                    {event.description}
                                </p>
                                <p className="event-card-date nunito-text">
                                    {event.event_date}
                                </p>
                                <p className="event-card-loc">
                                    {event.location.toUpperCase()}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }
}
