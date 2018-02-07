import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './groupCards.css';
import 'helpers.css';

export class GroupCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            searchFilter: 'name',
            searchText: '',
            searchField: 1,
            loading: true,
        };

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            searchFilter: props.searchFilter,
            searchText: props.searchText,
        });
    }

    componentWillMount() {
        axios.get('/api/groups').then(result => {
            this.setState({ loading: false, groups: result.data });
        });
    }
    render() {
        return this.props.loading ? (
            <div>
                {Array.apply(null, { length: 4 }).map((x, i) => {
                    return (
                        <div className="event-card-loading-container" key={i} />
                    );
                })}
            </div>
        ) : (
            <div>
                {this.props.groups.map((group, i) => {
                    console.log(group);
                    return (
                        <Link key={i} to={`/groups/${group.id}`}>
                            <div className="card-container">
                                <img
                                    className="group-card-image"
                                    src={
                                        group.group_picture ||
                                        require(`../../../../../web-p-category-pics/${
                                            group.category
                                        }.webp`)
                                    }
                                    alt={group.name}
                                />
                                <div className="group-card-content">
                                    <div>
                                        <p className="group-card-name">
                                            {group.name}
                                        </p>
                                    </div>
                                    <div>
                                        {group.category
                                            .charAt(0)
                                            .toUpperCase() +
                                            group.category.slice(1)}
                                    </div>
                                    <div>
                                        {group.number_of_members} Member(s)
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }
}
