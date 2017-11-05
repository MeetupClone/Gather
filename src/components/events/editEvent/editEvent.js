import React, { Component } from "react";

import { fire as firebase } from "../../../fire"

// import { Link } from "react-router-dom";

import axios from 'axios';

import Datetime from "react-datetime"

import { connect } from 'react-redux';

import moment from "moment"


import '../../../datePicker.css'


import { editEvent, deleteEvent } from "../../../ducks/event-redux"

export class EditEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            file: '',
            imagePreviewUrl: '',
            eventName: "",
            eventDate: "",
            cronTime: "",
            eventLocation: "",
            eventDescription: "",
            eventPic: "",
            organizerUid: '',
            currentUserUid: '',
            saved: false
        }

        this.handleChange = this.handleChange.bind(this)
    }


    submitImageUpload(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    handleChange(event) {
        this.setState({ eventDescription: event.target.value });
    };

    componentWillMount() {
        axios.get(`/api/event/${this.props.match.params.id}`).then(response => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.setState({ currentUserUid: user.uid })
                }
            })
            this.setState({
                eventName: response.data[0].title,
                eventLocation: response.data[0].location,
                eventDate: response.data[0].date,
                eventDescription: response.data[0].description,
                eventPic: response.data[0].event_image,
                organizerUid: response.data[0].organizer_uid
            })
        })
    }

    render() {
        const { editEvent } = this.props
        let notAuthenticated = null
        let deleteConfirm = null
        if (this.state.organizerUid !== this.state.currentUserUid) {
            notAuthenticated = (<h1> Get out!!!! </h1>)
            deleteConfirm = (<button> Delete Event </button>)
        }

        return (
            <div>
            {notAuthenticated}
            <input type="text" value={this.state.eventName} onChange={(event) => {return this.setState({eventName: event.target.value})}}/>
                <img src={this.state.imagePreviewUrl || this.state.eventPic} alt={this.state.eventName}></img>
                 <input className="fileInput" 
                    type="file" 
                    onChange={(event)=>this.submitImageUpload(event)} />
            
                Location
                <br/>
                <input type="text" value={this.state.eventLocation} onChange={(event) => {return this.setState({eventLocation: event.target.value})}}/>
                <br/>
               
                Date
                <Datetime defaultValue={this.state.eventDate} onChange={(event) => {
                    this.setState({eventDate: moment(event).format("MM/DD/YYYY HH:mm"), cronTime: moment(event).format()})}}/>
                <textarea type="text" id="noter-text-area" name="editableDescription" value={this.state.eventDescription} onChange={this.handleChange}></textarea>
                <button onClick={() => {return editEvent(this.state)}}> Save Event </button>
                {deleteConfirm}
            </div>
        )

    }

}

const mapStateToProps = (state) => { return {} }

const actions = {
    editEvent,
    deleteEvent
}

export default connect(mapStateToProps, actions)(EditEvent)