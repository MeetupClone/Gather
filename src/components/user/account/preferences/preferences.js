import React,{Component} from 'react';

import axios from 'axios';
import { fire as firebase} from "../../../../fire"

export class Preferences extends Component{
    constructor(props){
        super(props);

        this.state = {
            uid: "",
            preferences: "",
            userCat: []
        }
    }

    componentWillMount(){
        this.setState({preferences: this.props.preferences, uid: this.props.uid, userCat: this.props.userCat})
    }

    componentWillReceiveProps(props){
        console.log(props)
        this.setState({preferences: this.props.preferences, uid: this.props.uid, userCat: this.props.userCat})
    
    }
    changePreferences(){}

    render(){
        let preferenceText = null;
        let preferenceButton = null;
        if (this.state.preferences){
            // notificationText = (<h3>You currently have notifications turned on.</h3>)
            //     notificationButton = (<button onClick={(e) => {
            //                     this.changeNotificationPreferences()
            //             }}>Turn Off Notifications</button>)
        }
        else{
            //         <div>
//         <h3>You currently have notifications turned off.</h3>
//         <h4>Turn on notifications to recieve reminders about events!</h4>
//         </div>)
//     notificationButton = (<button onClick={(e) => {
//                     this.changeNotificationPreferences()
//             }}>Turn On Notifications</button>)
        }

        return(
            <div>
            <h1>Manage Preferences</h1>
            <h4>Topics You Like</h4>
            <p>{this.state.userCat.map(key => {
                return(
                    <div>{key.category}</div>
                )
            })}</p>
            <h1>ADD EDITING THING HERE</h1>
            <h4>Privacy Settings</h4>
            just copy the notification thing
            </div>
        )
        
// return (
//     <div>
//         <h1>Manage Notification Page</h1>
//         {notificationText}
//         {notificationButton} 
//         </div>
// )
}
}

