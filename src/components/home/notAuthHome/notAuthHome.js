import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './notAuthHome.css';
import Footer  from '../../footer/footer'
export default class NotAuthHome extends Component {
    render(){
        return(
            <div className="home">
              <div>
                <img className="gather-logo-home" align="left" src="http://static1.squarespace.com/static/5298f415e4b05482b01af09c/t/5298f5cae4b0e021fe88cc1c/1507776280790/" alt="gather logo"/>
                <h3>gath·er <br/> 1. come together; assemble or accumulate.</h3>
              </div>
              <div className="home-event-card">
                <img className="home-event-card-pic" src="https://petapixel.com/assets/uploads/2015/03/iStock-Unfinished-Business-5.jpg" alt="event pic"/>
                <div >
                  <h2>Explore</h2>
                  <p> Blah Blah Blah</p>
                  <Link to="/explore">
                  <button className="home-buttonz"> Explore</button>
                  </Link>
                </div>
              </div>
              <div className="home-create-card">
                <div>
                  <img className="home-create-card-pic" src="https://petapixel.com/assets/uploads/2015/03/iStock-Unfinished-Business-5.jpg" alt="create pic"/>
                </div>


              </div>
              <Footer/>
            </div>
        )
    }
}