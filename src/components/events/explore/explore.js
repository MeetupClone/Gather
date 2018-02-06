import React, { Component } from 'react';

import axios from 'axios';

import { RecommendedEvents } from './recommendedEvents/recommendedEvents.js';
import { ExploreSearch } from './exploreSearch/exploreSearch';
import Footer from 'components/footer/footer';
import 'helpers.css';

export default class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentWillMount() {
    if (JSON.parse(localStorage.getItem('events'))) {
      this.setState({
        events: JSON.parse(localStorage.getItem('events')).events,
      });
    } else {
      axios
        .get('/api/events')
        .then(result => this.setState({ events: result }));
    }
  }

  render() {
    return (
      <div className="explore-bottom-padding">
        <RecommendedEvents />
        <ExploreSearch />
        <Footer />
      </div>
    );
  }
}
