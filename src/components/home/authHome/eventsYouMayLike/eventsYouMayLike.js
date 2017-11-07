import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { fire as firebase } from "../../../../fire"

import './eventsYouMayLike.css';
import '../../../../helpers.css';

// import {underscore as _} from 'underscore';

const _ = require("underscore")

export default class EventsYouMayLike extends Component{
    constructor(props){
        super(props)

        this.state = {
            uid: "",
            reccEvents: [],
            userEvents: [],
            eventsArr: []
        }

      


    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                uid: user.uid
                })
            axios.get(`/api/relevant/event/${this.state.uid}`)
                .then(results => this.setState({reccEvents: results.data}))
                .catch(err => console.log("relevant event not working", err))

            axios.get(`/api/event/user/${this.state.uid}`)
                .then(result => this.setState({userEvents: result.data}))
            
            this.setState({eventsArr: this.state.reccEvents.concat(this.state.userEvents)})
                
             _.uniq(this.state.eventsArr, function (item) {
                return item.title + item.category;
            })
            

            }
            else{
                console.log("no user")
                            }})
    }


        render() {
                return(
                    <div>
                    <h4>Events You May Like</h4>
                        {this.state.eventsArr.map(function(event){

                        return(
                            <div className="recc-events-card-info nunito-text">
                            <div className="recc-events-location">{event.location.toUpperCase()}</div>
                            <div>{event.title}</div>
                            <div>{event.category}</div>
                            </div>
                        )
                    })}
                    </div>
                    )
            }
        
        }

    

