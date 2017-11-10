import React, { Component } from 'react';
import { fire as firebase } from "../../../fire"
import './authHome.css'
import '../../../helpers.css'

import { Link } from 'react-router-dom';
import Footer from '../../footer/footer'

import axios from 'axios';
import EventsYouMayLike from './eventsYouMayLike/eventsYouMayLike';

import "../../../components/events/explore/exploreSearch/eventCards/eventCards2.css"



export default class AuthHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: "",
            userEvents: [],
            recEvents: [],
            loading: true
        }




        this.componentWillMount = this.componentWillMount.bind(this)

    }



    componentWillMount() {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid
                })

                axios.get(`/api/event/user/${this.state.uid}`).then(result => 
                    this.setState({ loading: false, userEvents: result.data }))
            }
        })


    }


    render() {
        let appShell = null;


        if(this.state.loading){
            let arr = []

            for(var i = 0; i < 8; i++){
                arr.push(
                    <h1 className="home-page-loading-container" key = {i}> loading </h1>
                )
            }
            appShell = arr;

            return (<div>{appShell}</div>)

        } else {


            return (
                <div>
                <h3 className= "nunito-text">Your Events</h3>
                    {this.state.userEvents.map(key => {
                        return(
                            <div key={key.id} className="auth-event-card-container nunito-text">
                                <div className="auth-event-card-loc">{key.location}</div>
                                <div><Link to = {`/event/${key.id}`} className="auth-link">{key.title}</Link></div>
                                <div>{key.category}</div>
                            </div>
                        )
                    })}

                </div>
                <div className="footer-padding">

                    <EventsYouMayLike/>
                <Footer/>
            </div>
            )
        }
    }
}
}