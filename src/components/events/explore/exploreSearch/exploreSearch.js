import React, { Component } from 'react';
import axios from 'axios';
import { EventCards } from './eventCards/eventCards.js';

import { GroupCards } from './groupCards/groupCards.js';

import './exploreSearch.css';

export class ExploreSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            searchedEvents: [],
            groups: [],
            searchedGroups: [],
            searchEvents: true,
            loading: true,
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        let events = axios
            .get('/api/events')
            .then(events => {
                this.setState({
                    events: events.data.sort((a, b) => {
                        return (
                            new Date(b.cron_time).getTime() <
                            new Date(a.cron_time).getTime()
                        );
                    }),
                });
            })
            .catch(() => this.setState({ loading: false }));

        let groups = axios.get('/api/groups').then(result => {
            this.setState({ groups: result.data });
        });

        Promise.all([events, groups]).then(() => {
            this.setState({ loading: false });
        });
    }

    handleSearch(val) {
        if (this.state.searchEvents) {
            this.setState({
                searchedEvents: this.state.events.filter(curr => {
                    return (
                        curr.title.includes(val) || curr.location.includes(val)
                    );
                }),
            });
        } else {
            this.setState({
                searchedGroups: this.state.groups.filter(curr => {
                    return curr.name.includes(val);
                    // return (
                }),
            });
        }
    }

    render() {
        return this.state.loading ? null : (
            <div>
                <div className="search-section">
                    <input
                        className="search"
                        type="text"
                        placeholder="Search"
                        onChange={e => this.handleSearch(e.target.value)}
                    />
                </div>
                <span className="filter-buttons">
                    <button
                        className="events-button"
                        onClick={() => this.setState({ searchEvents: true })}>
                        Events
                    </button>
                    <button
                        className="group-button"
                        onClick={() => this.setState({ searchEvents: false })}>
                        Groups
                    </button>
                </span>
                {this.state.searchEvents ? (
                    <EventCards
                        events={
                            this.state.searchedEvents.length
                                ? this.state.searchedEvents
                                : this.state.events
                        }
                        loading={this.state.loading}
                        searchFilter={this.state.searchFilter}
                        searchText={this.state.searchText}
                    />
                ) : (
                    <GroupCards
                        groups={
                            this.state.searchedGroups.length
                                ? this.state.searchedGroups
                                : this.state.groups
                        }
                        loading={this.state.loading}
                        searchFilter={this.state.searchFilter}
                        searchText={this.state.searchText}
                    />
                )}
            </div>
        );
    }

    componentDidCatch() {
        console.log('dude');
    }
}
