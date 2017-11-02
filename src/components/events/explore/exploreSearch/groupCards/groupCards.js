import React, {Component} from 'react';

import axios from 'axios';

import './groupCards.css';

import {Link} from 'react-router-dom'



export class GroupCards extends Component{
    constructor(props){
        super(props);

        this.state = {
            groups: [],
            searchFilter: "name",
            searchText: "",
            searchField: 1
        }

        this.componentWillMount = this.componentWillMount.bind(this);


    }

    componentWillReceiveProps(props){
        this.setState({searchFilter: props.searchFilter, searchText: props.searchText})
        
    }

    componentWillMount(){
        axios.get('/api/groups').then(result => 
            this.setState({groups: result.data}))   
            
        };

    shouldComponentUpdate(newProps, newState){
        
        const updatePropsText = this.props.searchText !== newProps.searchText;
        const updatePropsFilter = this.props.searchFilter !== newProps.searchFilter;
        
        return !updatePropsText || !updatePropsFilter;
    }
    
    render(){
        const {searchText, searchFilter} = this.props;
                if(searchText !== "" && searchFilter === "name"){
                    
                    return(
                        <div>{this.state.groups.map(function(key){
                            if(key.name.toLowerCase().includes(searchText.toLowerCase())){
                            
                            return(
                                <div className="group-card-container" id="canvas">
                                <div className="group-card-content-container">
                                <Link to = {`/groups/${key.id}`}><p className="group-card-name">Name: {key.name}</p></Link>
                                    <p className="group-card-name">Name: {key.name}</p>
                                    <p className="group-card-category">Category: {key.category}</p>
                                    <p className="group-card-desc">Description: {key.description}</p>
                                </div>
                                </div>
                            )
                        }
                        })}
                        </div>
                    )
                }
                else if(searchText !== "" && searchFilter === "location"){
                    
                    return(
                        <div>{this.state.groups.map(function(key){
                            if(key.location.toLowerCase().includes(searchText.toLowerCase())){
                                
                            return(
                                <div className="group-card-container" id="canvas">
                                <div className="group-card-content-container">
                                <Link to = {`/groups/${key.id}`}><p className="group-card-name">Name: {key.name}</p></Link>
                              
                            return(
                                <div className="group-card-container" id="canvas">
                                <div className="group-card-content-container">
                                    <p className="group-card-name">Name: {key.name}</p>
                                    <p className="group-card-category">Category: {key.category}</p>
                                    <p className="group-card-desc">Description: {key.description}</p>
                                </div>
                                </div>
                            )
                        }
                        })}
                        </div>
                    )
                }
                else if(searchText !== "" && searchFilter === "category"){
                    console.log("category")
                    return(
                        <div>{this.state.groups.map(function(key){
                            if(key.category.toLowerCase().includes(searchText.toLowerCase())){
                                
                            return(
                                <div className="group-card-container" id="canvas">
                                <div className="group-card-content-container">
                                    <Link to = {`/groups/${key.id}`}><p className="group-card-name">Name: {key.name}</p></Link>
                              
                            return(
                                <div className="group-card-container" id="canvas">
                                <div className="group-card-content-container">
                                    <p className="group-card-name">Name: {key.name}</p>
                                    <p className="group-card-category">Category: {key.category}</p>
                                    <p className="group-card-desc">Description: {key.description}</p>
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
                    <div>{this.state.groups.map(function(key){
                        
                        return(
                            <div className="group-card-container" id="canvas">
                                <div className="group-card-content-container">
                                <Link to = {`/groups/${key.id}`}><p className="group-card-name">Name: {key.name}</p></Link>
                                    <p className="group-card-name">Name: {key.name}</p>
                                    <p className="group-card-category">Category: {key.category}</p>
                                    <p className="group-card-desc">Description: {key.description}</p>
                                </div>
                                </div>
                        )
                    })}</div>
                )
                    }
}
}