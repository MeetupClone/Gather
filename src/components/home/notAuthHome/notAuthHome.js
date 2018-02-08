import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './notAuthHome.css';
import 'helpers.css';

import Footer from 'components/footer/footer';
export default class NotAuthHome extends Component {
  render() {
    return (
      <div>
        <div className="home-container">
          <div className="home-title">
            <img
              className="gather-logo-home"
              align="left"
              src={require('../../../assets/logo.svg')}
              alt="gather logo"
            />
            <h3> Gather </h3>
            <h4> Hang out with similar people, live a better life</h4>
          </div>
          <div className="home-event-card">
            <img
              className="home-event-card-pic"
              src="/images/ben-duchac-66002.jpg"
              alt="event pic"
            />
            <Link to="/explore">
              <button className="home-buttonz"> Explore</button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
