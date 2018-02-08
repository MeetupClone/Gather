import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './eventsYouMayLike.css';
import 'helpers.css';

class EventsYouMayLike extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reccEvents: [],
            userEvents: [],
            eventsArr: [],
            checked: false,
        };
    }

    componentDidMount() {
        Promise.all([
            axios.get(`/api/event/user/${this.props.uid}`).then(result =>
                this.setState({
                    userEvents: result.data,
                })
            ),
            axios.get(`/api/relevant/event/${this.props.uid}`).then(results => {
                this.setState({
                    reccEvents: results.data,
                });
            }),
        ]).then(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        return !this.state.loading ? null : (
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
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    }
}

const mapStateToProps = ({ AuthenticationReducer }) => {
    return { uid: AuthenticationReducer.uid };
};

export default connect(mapStateToProps, {})(EventsYouMayLike);
