import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';

import { RecommendedEvents } from './recommendedEvents/recommendedEvents.js';
import { ExploreSearch } from './exploreSearch/exploreSearch';
import "../../../helpers.css"
import "./explore.css"
import Footer  from '../../footer/footer'





export default class Explore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            //needs all the, uh, UGGGH PROPS FROM KIDS HERE
        }

    }

    componentWillMount() {
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
            <div className="explore-page">
              <div><RecommendedEvents/></div>
              <div><ExploreSearch/></div>
              <Footer/>
            </div>
        )
    }
}