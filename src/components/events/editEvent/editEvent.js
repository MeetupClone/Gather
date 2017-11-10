import React, { Component } from "react";

import { fire as firebase } from "../../../fire"

// import { Link } from "react-router-dom";

import axios from 'axios'
import Datetime from "react-datetime"
import { connect } from 'react-redux';
import moment from "moment"
import PlaceSearchForm from "../../placeSearchForm/placeSearchForm";
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
            placeId: "",
            eventDescription: "",
            eventPic: "",
            organizerUid: '',
            currentUserUid: '',
            confirmDeleteInput: '',
            saved: false,
            deleteConfirm: false
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
                eventDate: response.data[0].event_date,
                eventDescription: response.data[0].description,
                eventPic: response.data[0].event_image,
                organizerUid: response.data[0].organizer_uid,
                cronTime: response.data[0].cron_time
            })
        })
    }

    render() {
        var yesterday = Datetime.moment().subtract(1, 'day');
        var valid = function(current) {
            return current.isAfter(yesterday);
        };

        const { editEvent, deleteEvent } = this.props
        let notAuthenticated = null
        let deleteConfirmPopup = null;
        let deleteConfirm = null
        let finalDeleteButton = null;

        if (this.state.organizerUid !== this.state.currentUserUid) {
            notAuthenticated = (<h1> You can't edit this event, you aren't the event owner. </h1>)
        } else {
            deleteConfirm = (<button onClick={() => this.setState({deleteConfirm: true})}>Delete Event</button>)
        }

        if (this.state.eventName === this.state.confirmDeleteInput) {
            finalDeleteButton = (<button onClick={() => deleteEvent(this.state)}> Delete Event </button>)
        }

        if (this.state.deleteConfirm) {
            deleteConfirm = (
                <div> 
                <h1> Are you sure you want to delete this event? </h1>
                <h3> Type the name of your event to delete the event. </h3>
                <input onChange={(event) => {this.setState({confirmDeleteInput: event.target.value}).then(result => {

                })}} />
                    {finalDeleteButton}
                </div>)
        }

        return (
            <div>
            {deleteConfirm}
            {deleteConfirmPopup}
            {notAuthenticated}
            <input type="text" value={this.state.eventName} onChange={(event) => {return this.setState({eventName: event.target.value})}}/>
                <img src={this.state.imagePreviewUrl || this.state.eventPic} alt={this.state.eventName}></img>
                 <input className="fileInput" 
                    type="file" 
                    onChange={(event)=>this.submitImageUpload(event)} />
                <br/>
                Location
                <PlaceSearchForm value={this.state.eventLocation} updateParent={(location) => {
                    console.log(location)
                    this.setState({eventLocation: location.address, placeId: location.placeId})
                }}/>
                <br/>
               
                Date
                <Datetime isValidDate={ valid } defaultValue={this.state.eventDate} onChange={(event) => {
                    this.setState({eventDate: moment(event).format("MM/DD/YYYY HH:mm"), cronTime: moment.utc(event).subtract(3, 'hours').format()})}}/>
                <textarea type="text" id="noter-text-area" name="editableDescription" value={this.state.eventDescription} onChange={this.handleChange}></textarea>
                <button onClick={() => {return editEvent(this.state)}}> Save Event </button>
                
            </div>
        )

    }

}

const mapStateToProps = (state) => { return state }

const actions = {
    editEvent,
    deleteEvent
}

export default connect(mapStateToProps, actions)(EditEvent)