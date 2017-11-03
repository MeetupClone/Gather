import React, {Component} from 'react';


import axios from 'axios';

export default class GroupPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            groupName: "",
            category: "",
            groupLocation: "",
            groupDesc: "",
            groupMembers: [],
            groupFB: "",
            groupTwitter: "",
            website: "",

        }

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        
        axios.get(`/api/group/${this.state.id}`).then(response => {
            this.setState({groupName: response.data[0].name, category: response.data[0].category, groupDesc: response.data[0].description, groupFB: response.data[0].facebook, groupTwitter: response.data[0].twitter,})
            
        })
    }
    render(){
        
        return(
            <div>
                <h1>GROUP PAGE</h1>
                <h1>{this.state.groupName}</h1>
                <h3>{this.state.groupDesc}</h3>
            </div>
        )
    }
}