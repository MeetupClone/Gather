import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Explore extends Component {
    render(){
        return(
            <div>
                <h1> Explore Page</h1>
                <Link to="/event/create"> <h2>Create Event</h2></Link>
                <Link to="/event/:id"><h2>Single Event Page</h2></Link>
            </div>
        )
    }
}