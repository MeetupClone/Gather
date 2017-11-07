import React,{Component} from 'react';

import axios from 'axios';
import { fire as firebase} from "../../../../fire"

export class Preferences extends Component{
    constructor(props){
        super(props);

        this.state = {
            uid: "",
            preferences: ""
        }
    }

    componentWillMount(){
        
    }

    componentWillReceiveProps(props){
        console.log(props)
        this.setState({preferences: this.props.preferences, uid: this.props.uid})
    }
    

    render(){
        console.log(this.state)
        return(
            <div>
            <h1>Manage Preferences</h1>
            <p>{this.state.preferences.map(key => {
                return(
                    <div>{/* see what data is being returned from call in the account */}</div>
                )
            })}}</p>
            </div>
        )
}
}