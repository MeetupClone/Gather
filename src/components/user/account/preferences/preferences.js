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

        this.changePreferences = this.changePreferences.bind(this)

    }

    componentDidMount(){

        axios.get(`/api/user/account/getPref/${this.state.uid}`)
        .then(result => {
            this.setState({preferences: result.data[0].preference_settings})
     })
         .catch(err => console.log("getPref error", err))
     
     axios.get(`/api/user/account/getCat/${this.state.uid}`)
         .then(result => {
             this.setState({userCat: result.data})
     })
         .catch(err => console.log("getCat", err))
    }


    changePreferences(){
        axios.post("/api/user/updateprefs", [!this.state.preferences, this.state.uid]).then(response => console.log(response))
        this.setState({preferences: !this.state.preferences})
        console.log(this.state)
    }

    render(){
        let preferenceText = null;
        let preferenceButton = null;
        if (this.state.preferences){
            preferenceText = (<p>You are currently sharing information on your profile.</p>)
                preferenceButton = (<button onClick={(e) => {
                                this.changePreferences()
                        }}>Turn On Privacy Mode</button>)
        }
        else{
            preferenceText = (<div>
        <p>You currently have no information displayed on your profile.</p>
        </div>)
    preferenceButton = (<button onClick={(e) => {
                    this.changePreferences()
            }}>Turn Off Privacy Mode</button>)
        }

        return(
            <div>
            <h1>Manage Preferences</h1>
            <h4>Categories You Like</h4>
            <p>{this.state.userCat.map(key => {
                return(
                    <div>{key.category}</div>
                )
            })}</p>
            <h4>Privacy Settings</h4>
            {preferenceText}
            {preferenceButton}
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

