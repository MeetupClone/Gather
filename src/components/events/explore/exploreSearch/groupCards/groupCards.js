import React from 'react';
import { Link } from 'react-router-dom';

import './groupCards.css';
import 'helpers.css';

export const GroupCards = props => {
    return props.loading ? (
        <div>
            {Array.apply(null, { length: 4 }).map((x, i) => {
                return <div className="event-card-loading-container" key={i} />;
            })}
        </div>
    ) : (
        <div>
            {props.groups.map((group, i) => {
                return (
                    <Link key={i} to={`/groups/${group.id}`}>
                        <div className="group-card-container">
                            {group.group_picture ? (
                                <img
                                    className="group-card-image"
                                    src={group.group_picture}
                                    alt={group.name}
                                />
                            ) : null}

                            <div className="group-card-content">
                                <p className="group-card-name">{group.name}</p>

                                <div>
                                    {group.category.charAt(0).toUpperCase() +
                                        group.category.slice(1)}
                                </div>
                                <div>{group.number_of_members} Member(s)</div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
