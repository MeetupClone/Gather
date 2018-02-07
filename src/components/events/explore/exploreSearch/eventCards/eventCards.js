import React from 'react';
import { Link } from 'react-router-dom';

import './eventCards2.css';
import 'helpers.css';

export const EventCards = props => {
    return props.loading ? (
        <div>
            {Array.apply(null, { length: 4 }).map((x, i) => {
                return <div className="event-card-loading-container" key={i} />;
            })}
        </div>
    ) : (
        <div>
            {props.events.map((event, i) => {
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
};
