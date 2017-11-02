import React, {Component} from 'react';

import axios from 'axios';

export default class SingleEvent extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            eventName: "",
            eventDate: "",
            eventLocation: "",
            eventDescription: "",
            eventPic: "",
        }

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        axios.get(`/api/event/${this.state.id}`).then(response => {
            
            this.setState({ eventName: response.data[0].title, 
                            eventLocation: response.data[0].location, 
                            eventDescription: response.data[0].description, 
                            eventPic: response.data[0].event_image,
                            eventDate: response.data[0].date
                        })    
        }).catch(err => console.log(err))
    }

    render(){
        
        return(
            <div>
                <h1> Single Event Page </h1>
                <h1>{this.state.eventName}</h1>
                <img src={this.state.eventPic} alt="Event Image"></img>
                <h3>{this.state.eventLocation}</h3>
                <h3>{this.state.eventDate}</h3>
                <p>{this.state.eventDescription}</p>    
            </div>
        )
    }
}