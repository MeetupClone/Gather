import React,{Component} from 'react';


import { fire as firebase} from "../../../../fire"
import axios from 'axios';

export class Notifications extends Component{
    constructor(props){
        super(props);

        this.state = {
            uid: "",
            preferences: [],
            notifications: false,
        }

        this.turnNotificationsOn = this.turnNotificationsOn.bind(this);
        this.turnNotificationsOff = this.turnNotificationsOff.bind(this);

    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid,
                    email: user.email
                })
                axios.get(`/api/user/account/getPref/${this.state.uid}`)
                .then(result => {
                    console.log(result.data )
                    this.setState({notifications: result.data[0].notification_settings})})
                .catch(err => console.log("getPref error", err))
            }
            else{
                console.log("no user")
            }
        }
        )
    }

    turnNotificationsOn(){

    }

    turnNotificationsOff(){
        
    }


    render(){
        if(!this.state.notifications){
            return(
                <div>
                <h1>Manage Notification Page</h1>
                <h3>You currently have notifications turned off.</h3>
                <button onClick={(event) => {
                                    this.setState({notifications: true})
        
        console.log(this.state.notifications)

        axios.post("/api/user/updatenotifs", this.state)
            .then(response => console.log(response))
            .catch(err => console.log("he screm AHHHH", err))
        
                    }}>Allow Notifications</button>
                <button onClick={(event) => {
                            this.setState({notifications: false})

        console.log(this.state.notifications)

        axios.post("/api/user/updatenotifs", this.state)
            .then(response => console.log(response))
            .catch(err => console.log("he screm AHHH", err));
                    }}>Allow No Notifications</button>
                </div>
        )
    }
        else if(this.state.notifications){
            return(
                <div>
                <h1>Manage Notification Page</h1>
                <h3>You currently have notifications turned on.</h3>
                <button onClick={(event) => {
                                    this.setState({notifications: true})
        
        console.log(this.state.notifications)

        axios.post("/api/user/updatenotifs", this.state)
            .then(response => console.log(response))
            .catch(err => console.log("he screm AHHHH", err))
        
                    }}>Allow Notifications</button>
                <button onClick={(event) => {
                            this.setState({notifications: false})

        console.log(this.state.notifications)

        axios.post("/api/user/updatenotifs", this.state)
            .then(response => console.log(response))
            .catch(err => console.log("he screm AHHH", err));
                    }}>Allow No Notifications</button>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h4>Loading...</h4>
                </div>
            )
        }
}
}