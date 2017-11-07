import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';

import { RecommendedEvents } from './recommendedEvents/recommendedEvents.js';
import { ExploreSearch } from './exploreSearch/exploreSearch';





export default class Explore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            //needs all the, uh, UGGGH PROPS FROM KIDS HERE
        }

    }

    componentWillMount() {
        console.log(JSON.parse(localStorage.getItem('events')))
        if (JSON.parse(localStorage.getItem('events'))) {
            console.log("there")
            this.setState({ events: JSON.parse(localStorage.getItem('events')).events })
            console.log(this.state)
        } else {

            axios.get('/api/events').then(result => this.setState({ events: result }));
        }
    }

    render() {

        return (
            <div>
              <div><RecommendedEvents/></div>
              <div><ExploreSearch/></div>
              <div>Footer</div>



            </div>
        )
    }
}