import React, { Component } from 'react';
import axios from 'axios';
import { EventCards } from './eventCards/eventCards.js';

import { GroupCards } from './groupCards/groupCards.js';

import './exploreSearch.css';

export class ExploreSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchedEvents: [],
            searchFilter: 'Name',
            searchEvents: true,
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

    handleSearch(val) {
        this.setState({
            searchedEvents: this.state.events.filter(curr => {
                return curr.title.includes(val) || curr.location.includes(val);
            }),
        });
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
                    <span className="filter-dropdown">
                        <select
                            onChange={e =>
                                this.setState({ searchFilter: e.target.value })
                            }>
                            <option value="Name">Name</option>
                            <option value="Location">Location</option>
                            <option value="Category">Category</option>
                            <option value="Group-Events">Group Events</option>
                        </select>
                    </span>
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
                        searchFilter={this.state.searchFilter}
                        searchText={this.state.searchText}
                    />
                ) : (
                    <GroupCards
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
