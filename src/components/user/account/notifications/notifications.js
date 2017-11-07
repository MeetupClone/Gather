import React, { Component } from 'react';


import { fire as firebase} from "../../../../fire"
import axios from 'axios';

import { fire as firebase } from "../../../../fire"

export class Notifications extends Component {
    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            uid: "",
            notifications: '',
        }

        this.changeNotificationPreferences = this.changeNotificationPreferences.bind(this);

    }

    componentWillMount() {

    }

    componentWillReceiveProps(props) {
        this.setState({ notifications: this.props.notifications, uid: this.props.uid })

    }

    changeNotificationPreferences() {
        if (!this.state.notifications) {
            this.setState({ notifications: true })
        } else {
            this.setState({ notifications: false })
        }

        axios.put("/api/user/updatenotifs/", [this.state.notifications, this.state.uid]).then(response => console.log(response))

    }


    render() {
        let notificationText = null
        let notificationButton = null
        if (this.state.notifications) {
            notificationText = (<h3>You currently have notifications turned on.</h3>)
            notificationButton = (<button onClick={(e) => {
                            this.changeNotificationPreferences()
                    }}>Turn Off Notifications</button>)
        } else {
            notificationText = (
                <div>
                <h3>You currently have notifications turned off.</h3>
                <h4>Turn on notifications to recieve reminders about events!</h4>
                </div>)
            notificationButton = (<button onClick={(e) => {
                            this.changeNotificationPreferences()
                    }}>Turn On Notifications</button>)
        }

        return (
            <div>
                <h1>Manage Notification Page</h1>
                {notificationText}
                {notificationButton} 
                </div>
        )
    }

}
