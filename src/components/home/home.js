import React, { Component } from 'react';

import AuthHome from './authHome/authHome';
import NotAuthHome from './notAuthHome/notAuthHome';

import { fire as firebase} from "../../fire"

export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: false,
            uid: ""
        }

        this.componentWillMount = this.componentWillMount.bind(this)

    }

    

    componentWillMount(){
        
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: true,
                    uid: user.uid
                })
            }
            else{
                this.setState({
                    user: false,
                })
            }})

    }

    render() {
        if(this.state.user){
            return(
            <AuthHome uid={this.state.uid}/>
            )
        } 
        else{
        return (
            <NotAuthHome/>
        );
    }
    }
}