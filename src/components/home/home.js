import React, { Component } from 'react';

// import AuthHome from './authHome/authHome';
import NotAuthHome from './notAuthHome/notAuthHome';


export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            sick: true,
        }

    }
    render() {
        //if statement to check firebase auth shit goes here, returns auth home comp if true and non auth comp is false 
        return (
            <div>
        		<NotAuthHome/>
        	</div>
        );
    }
}