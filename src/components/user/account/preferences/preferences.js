import React,{Component} from 'react';

import axios from 'axios';
import { fire as firebase} from "../../../../fire"
import Category from "../../../categories/category"

export class Preferences extends Component{
    constructor(props){
        super(props);

        this.state = {
            uid: this.props.uid,
            preferences: "",
            userCat: [],
            categories: []
        }

        this.updateParent = (state) => this.props.updateParent(this.state)
        this.changePreferences = this.changePreferences.bind(this)

    }

    componentWillMount(){

        axios.get(`/api/user/account/getPref/${localStorage.getItem('uid')}`)
        .then(result => {
            this.setState({preferences: result.data[0].preference_settings})
     })
         .catch(err => console.log("getPref error", err))
     
     axios.get(`/api/user/account/getCat/${localStorage.getItem('uid')}`)
         .then(result => {
             this.setState({categories: result.data})
     })
         .catch(err => console.log("getCat", err))
    }

    updateParent(cats){
    }


    changePreferences(){
        axios.post("/api/user/updateprefs", [!this.state.preferences, this.state.uid]).then(response => console.log(response))
        this.setState({preferences: !this.state.preferences})
        console.log(this.state)
    }

    render(){
        console.log(this.state.categories)
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
            <h4>Privacy Settings</h4>
            <div>
            {preferenceText}
            {preferenceButton}
            </div>
            <h4>Categories You Like</h4>
            {/* <div>{this.state.userCat.map((key,i) => {
                let category = key.category
                return(
                    <p key={i}>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                )
            })}</div> */}
            <Category categories={this.state.categories} required updateParent={(state) => {
                this.setState({categories: state})}}/>
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

