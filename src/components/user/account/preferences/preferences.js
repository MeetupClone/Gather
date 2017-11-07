import React,{Component} from 'react';


export class Preferences extends Component{
    constructor(props){
        super(props);

        this.state = {
            preferences: ""
        }
    }

    componentWillReceiveProps(props){
        this.setState({preferences: this.props.preferences})

    }

    render(){
        console.log(this.state)
        return(
            <div>
            <h1>Manage Preferences</h1>
            <p>Categories they like, how much info to list on the profile</p>
            </div>
        )
}
}