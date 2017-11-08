import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './notAuthHome.css';
import "../../../helpers.css";

import Footer  from '../../footer/footer'
export default class NotAuthHome extends Component {
    render(){
        return(
            <div className="home">
                <img className="gather-logo-home" align="left" src="http://static1.squarespace.com/static/5298f415e4b05482b01af09c/t/5298f5cae4b0e021fe88cc1c/1507776280790/" alt="gather logo"/>
                <h3>gath·er <br/> 1. come together; assemble or accumulate.</h3>
              <div className="home-event-card">
                <img className="home-event-card-pic" src="http://www.joshuanhook.com/wp-content/uploads/2017/07/explore.jpg" alt="event pic"/>
                  <Link to="/explore">
                  <button className="home-buttonz"> Explore</button>
                  </Link>
              </div>
              <div className="home-create-card">
                  <img className="home-create-card-pic" src="https://cdn.yourstory.com/wp-content/uploads/2016/11/creative-daily-life.png" alt="create pic"/>
              </div>
              <Footer/>
            </div>
        )
    }
}