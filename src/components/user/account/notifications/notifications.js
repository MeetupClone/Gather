import React,{Component} from 'react';

import axios from 'axios';

export class Notifications extends Component{
    constructor(props){
        super(props);

        this.state = {
            uid: "",
            notifications: false,
        }

        this.turnNotificationsOn = this.turnNotificationsOn.bind(this);
        this.turnNotificationsOff = this.turnNotificationsOff.bind(this);

    }

    componentWillReceiveProps(props){
        console.log(this.props)
        this.setState({notifications: this.props.notifications, uid: this.props.uid})

    }

    turnNotificationsOn(){
        this.setState({notifications: true})

        console.log(this.state.notifications)

        axios.put("/api/user/updatenotifs/", [this.state.notifications, this.state.uid]).then(response => console.log(response))
        
    }

    turnNotificationsOff(){
        this.setState({notifications: false})

        console.log(this.state.notifications)

        axios.put("/api/user/updatenotifs/", this.state).then(response => console.log(response))
    }


    render(){
        if(this.state.notifications === false){
            return(
                <div>
                <h1>Manage Notification Page</h1>
                <h3>You currently have notifications turned off.</h3>
                <button onClick={(e) => {
                            this.setState({notifications: true})
                            console.log(this.state.notifications)
                    }}>Allow Notifications</button>
                <button onClick={(e) => {
                            this.setState({notifications: false})
                            console.log(this.state.notifications)
                    }}>Allow No Notifications</button>
                </div>
        )
    }
        else{
            return(
                <div>
                <h1>Manage Notification Page</h1>
                <h3>You currently have notifications turned on.</h3>
                <button onClick={(e) => {
                            this.setState({notifications: true})
                            console.log(this.state.notifications)
                  }}>Allow Notifications</button>
                <button onClick={(e) => {
                            this.setState({notifications: false})
                            console.log(this.state.notifications)
                    }}>Allow No Notifications</button>
                </div>
            )
        }
}
}