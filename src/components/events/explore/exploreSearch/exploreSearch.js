import React, { Component } from 'react';

import { EventCards } from './eventCards/eventCards.js';

import { GroupCards } from './groupCards/groupCards.js';

import "./exploreSearch.css"

//

export class ExploreSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            searchFilter: "Name",
            searchField: 0,
        }

        this.updateSearchText = this.updateSearchText.bind(this);
        this.updateSearchFilter = this.updateSearchFilter.bind(this);
        this.updateSearchField = this.updateSearchFilter.bind(this);
    }

    updateSearchText(val) {
        this.setState({ searchText: val })
    }

    updateSearchFilter(val) {
        this.setState({ searchFilter: val })
    }

    updateSearchFieldEvent() {
        this.setState({ searchField: 0 })
    }

    updateSearchFieldGroup() {
        this.setState({ searchField: 1 })
    }


    render() {

        if (this.state.searchField === 0) {
            return (
                <div>
                <input className="search" type="text" placeholder="Search" onChange={(e) => this.updateSearchText(e.target.value)}/>
                <span className="filter-dropdown">
                    <select onChange={(e) => this.updateSearchFilter(e.target.value)}>
                        <option value="Name">Name</option>
                        <option value="Location">Location</option>
                        <option value="Category">Category</option>
                        <option value="Group-Events">Group Events</option>
                    </select>
                </span>
                <span className="filter-buttons">
                    <button className="events-button" onClick={(e) => this.updateSearchFieldEvent()}>Events</button>
                    <button className="group-button" onClick={(e) => this.updateSearchFieldGroup()}>Group</button>
                </span>
                <EventCards searchFilter={this.state.searchFilter} searchText={this.state.searchText}/>
                
                </div>
            )
        } else {
            return (
                <div>
                <input className="search" type="text" placeholder="Search" onChange={(e) => this.updateSearchText(e.target.value)}/>
                <span className="filter-dropdown">
                <select className="categorySelector" onChange={(e) => this.updateSearchFilter(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="location">Location</option>
                    <option value="category">Category</option>
                    <option value="group-events">Group Events</option>    
                </select>
                </span>
                <span className="filter-buttons">
                    <button className="events-button" onClick={(e) => this.updateSearchFieldEvent()}>EVENTS</button>
                    <button className="group-button" onClick={(e) => this.updateSearchFieldGroup()}>GROUP</button>
                </span>
                <GroupCards searchFilter={this.state.searchFilter} searchText={this.state.searchText}/>
                </div>
            )
        }
    }
}