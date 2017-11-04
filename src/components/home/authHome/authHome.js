import React, { Component } from 'react';
import { fire as firebase } from "../../../fire"
import './authHome.css'
import '../../../helpers.css'

import {Link} from 'react-router-dom'

import axios from 'axios';

import { getAuthInfo } from "../../../ducks/login-redux"



export default class AuthHome extends Component{
    constructor(props){
        super(props);

        this.state = {
            uid: "",
            userEvents: [],
            recEvents: [],
        }

         
            
       
        this.componentWillMount = this.componentWillMount.bind(this)
    
    }

   

    componentWillMount(){

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("user")
                this.setState({
                    uid: user.uid
                })
                axios.get(`/api/event/user/${this.state.uid}`).then(result => this.setState({userEvents: result.data}))
            }
            else{
                console.log("no user")
                }})

        
    }


    render(){

        
        
        return(
            <div>
                <div>
                    {this.state.userEvents.map(key => {
                        return(
                            <div  className="auth-event-card-info nunito-text">
                                <div className="auth-event-card-loc">{key.location.toUpperCase()}</div>
                                <div>{key.data}</div>
                                <div><Link to = {`/event/${key.id}`} className="auth-link">{key.title}</Link></div>
                                <div>{key.category}</div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    Events You May Like Component
                </div>
            </div>
        )

    }
}