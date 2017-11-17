import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './notAuthHome.css';
import "../../../helpers.css";

import Footer  from '../../footer/footer'
export default class NotAuthHome extends Component {
    render(){
        return(
            <div className="home">
                <img className="gather-logo-home" align="left" src={require('../../../assets/logo.svg')} alt="gather logo"/>
                <h3>gath·er <br/> 1. come together; assemble or accumulate.</h3>
              <div className="home-event-card">
                <img className="home-event-card-pic" src="/images/ben-duchac-66002.jpg" alt="event pic"/>
                  <Link to="/explore">
                  <button className="home-buttonz"> Explore</button>
                  </Link>
              </div>
              <div className="home-create-card">
                  <img className="home-create-card-pic" src="/images/rawpixel-com-250087.jpg" alt="create pic"/>
              </div>
              <Footer/>
            </div>
        )
    }
}