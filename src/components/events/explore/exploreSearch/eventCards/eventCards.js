import React, {Component} from 'react';

import axios from 'axios';

import './eventCards.css';

export class EventCards extends Component{
    constructor(props){
        super(props);

        this.state ={
            events: [],
            searchFilter: "",
            searchText: "",
            searchField: 1,
        }

      this.componentWillMount = this.componentWillMount.bind(this);
    }
    
    componentWillReceiveProps(props){
        this.setState({searchFilter: props.searchFilter, searchText: props.searchText})

    }

    componentWillMount(){
        axios.get('/api/events').then(result => 
            this.setState({events: result.data}))   
        };

    shouldComponentUpdate(newProps, newState){
        
        const updatePropsText = this.props.searchText !== newProps.searchText;
        const updatePropsFilter = this.props.searchFilter !== newProps.searchFilter;

        return !updatePropsText || !updatePropsFilter;
    }
    

    render(){
        const {searchText, searchFilter} = this.props;

        if(searchText != "" && searchFilter === "Name"){
            
            return(
                <div>{this.state.events.map(function(key){
                    if(key.title.toLowerCase().includes(searchText.toLowerCase())){
                    
                    return(
                        <div class="event-card-container">
                        <div class="event-card-content-container">
                            <img className="event-card-pic" src={key.event_image} alt="pic not working"/>
                            <p className="event-card-title">Title: {key.title}</p>
                            <p className="event-card-category">Category: {key.category}</p>
                            <p className="event-card-loc">Location: {key.location}</p>
                            <p className="event-card-desc">Description: {key.description}</p>
                        </div>
                        </div>
                    )
                }
                })}
                </div>
            )
        }
        else if(searchText != "" && searchFilter === "Location"){
            
            return(
                <div>{this.state.events.map(function(key){
                    if(key.location.toLowerCase().includes(searchText.toLowerCase())){
                      
                    return(
                        <div class="event-card-container">
                        <div class="event-card-content-container">
                            <img className="event-card-pic" src={key.event_image} alt="pic not working"/>
                            <p className="event-card-title">Title: {key.title}</p>
                            <p className="event-card-category">Category: {key.category}</p>
                            <p className="event-card-loc">Location: {key.location}</p>
                            <p className="event-card-desc">Description: {key.description}</p>
                        </div>
                        </div>
                    )
                }
                })}
                </div>
            )
        }
        else if(searchText != "" && searchFilter === "Category"){
            return(
                <div>{this.state.events.map(function(key){
                    if(key.category.toLowerCase().includes(searchText.toLowerCase())){
                      
                    return(
                        <div class="event-card-container">
                        <div class="event-card-content-container">
                            <img className="event-card-pic" src={key.event_image} alt="pic not working"/>
                            <p className="event-card-title">Title: {key.title}</p>
                            <p className="event-card-category">Category: {key.category}</p>
                            <p className="event-card-loc">Location: {key.location}</p>
                            <p className="event-card-desc">Description: {key.description}</p>
                        </div>
                        </div>
                    )
                }
                })}
                </div>
            )
        }
        else{
        return(
            <div>{this.state.events.map(function(key){
                
                return(
                    <div class="event-card-container">
                        <div class="event-card-content-container">
                            <img className="event-card-pic" src={key.event_image} alt="pic not working"/>
                            <p className="event-card-title">Title: {key.title}</p>
                            <p className="event-card-category">Category: {key.category}</p>
                            <p className="event-card-loc">Location: {key.location}</p>
                            <p className="event-card-desc">Description: {key.description}</p>
                        </div>
                        </div>
                )
            })}</div>
        )
            }
    }
}