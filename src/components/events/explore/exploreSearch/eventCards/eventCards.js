import React, { Component } from 'react';

import axios from 'axios';

import './eventCards2.css';
import '../../../../../helpers.css'

import { Link } from 'react-router-dom';
import Footer from '../../../../footer/footer'


export class EventCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            searchFilter: "name",
            searchText: "",
            searchField: 1,
            loading: true
        }

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({ searchFilter: props.searchFilter, searchText: props.searchText })

    }

    componentWillMount() {
        axios.get('/api/events').then(result => {


            this.setState({ loading: false, events: result.data })

             this.setState({ loading: false, events: result.data.sort(function(a, b) {
            return new Date(a.event_date) - new Date(b.event_date);
        })})
        })


    };


    shouldComponentUpdate(newProps, newState) {

        const updatePropsText = this.props.searchText !== newProps.searchText;
        const updatePropsFilter = this.props.searchFilter !== newProps.searchFilter;

        return !updatePropsText || !updatePropsFilter;
    }



    render() {
       


        let now = new Date();

        const { searchText, searchFilter } = this.props;
        let appShell = null;

        if (this.state.loading) {
            let arr = []

            for (var i = 0; i < 8; i++) {
                arr.push(
                    <h1 className="event-card-loading-container" key = {i}></h1>
                )
            }
            appShell = arr;

            return (<div>{appShell}</div>)
        } else {



            if (searchText !== "" && searchFilter === "Name") {
                const {events} = this.props
                return (
                    <div>
                {Object.keys(events).map(key => {
                    let eventDate = new Date(key.event_date)
                    if((key.title.toLowerCase().includes(searchText.toLowerCase())) && eventDate < now){
                    
                    return(
                         <Link to = {`/event/${key.id}`}>
                    <div key={key.id} className="event-card-container">
                            <div className="event-card-date nunito-text">
                                {key.event_date}
                            </div>
                            <div  className="event-card-info nunito-text">
                                <div className="event-card-loc">{key.location.toUpperCase()}</div>
                                <div><Link to = {`/event/${key.id}`} className="event-title-link">{key.title}</Link></div>
                                <div>{key.category}</div>
                                <div className="event-card-desc"><p className="event-limit-desc">{key.description}</p></div>
                            </div>
                            </div>
                            </Link>

                )}
            })}</div>
                )
            } else if (searchText !== "" && searchFilter === "Location") {

                return (
                    <div>{this.state.events.map(function(key){
                    let eventDate = new Date(key.event_date)
                    if((key.location.toLowerCase().includes(searchText.toLowerCase())) && eventDate < now){
                      
                    return(
 <Link to = {`/event/${key.id}`}>
                    <div key={key.id} className="event-card-container">
                            <div className="event-card-date nunito-text">
                                {key.event_date}
                            </div>
                            <div  className="event-card-info nunito-text">
                                <div className="event-card-loc">{key.location.toUpperCase()}</div>
                                <div><Link to = {`/event/${key.id}`} className="event-title-link">{key.title}</Link></div>
                                <div>{key.category}</div>
                                <div className="event-card-desc"><p className="event-limit-desc">{key.description}</p></div>
                            </div>
                            </div>
                            </Link>

                )}
            })}</div>
                )
            } else if (searchText !== "" && searchFilter === "Category") {
                return (
                    <div>{this.state.events.map(function(key){
                    let eventDate = new Date(key.event_date)
                    if((key.category.toLowerCase().includes(searchText.toLowerCase())) && eventDate < now){
                      
                    return(
 <Link to = {`/event/${key.id}`}>
                    <div key={key.id} className="event-card-container">
                            <div className="event-card-date nunito-text">
                                {key.event_date}
                            </div>
                            <div  className="event-card-info nunito-text">
                                <div className="event-card-loc">{key.location.toUpperCase()}</div>
                                <div><Link to = {`/event/${key.id}`} className="event-title-link">{key.title}</Link></div>
                                <div>{key.category}</div>
                                <div className="event-card-desc"><p className="event-limit-desc">{key.description}</p></div>
                            </div>
                            </div>
                            </Link>

                )}
            })}</div>
                )
            } else {
                return (
                    <div>{this.state.events.map(function(key){
                let eventDate = new Date(key.event_date)
            if(eventDate > now){
                return(
                    <Link to = {`/event/${key.id}`}>
                    <div key={key.id} className="event-card-container">
                            <div className="event-card-date nunito-text">
                                {key.event_date}
                            </div>
                            <div  className="event-card-info nunito-text">
                                <div className="event-card-loc">{key.location.toUpperCase()}</div>
                                <div><Link to = {`/event/${key.id}`} className="event-title-link">{key.title}</Link></div>
                                <div>{key.category}</div>
                                <div className="event-card-desc"><p className="event-limit-desc">{key.description}</p></div>
                            </div>
                            </div>
                            </Link>

                )}
            })}</div>
                )
            }
        }
    }
}