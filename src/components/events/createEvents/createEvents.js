import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fire as firebase } from "../../../fire";
import './createEvents.css';
import { createEvent } from "../../../ducks/event-redux";
import PlaceSearchForm from "../../placeSearchForm/placeSearchForm";
import Category from "../../categories/category";

import Datetime from "react-datetime";
import moment from "moment";

import Facebook from '../../facebook/facebook'
import Twitter from '../../twitter/twitter'
import Email from '../../email/email'

export class CreateEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventPic: '',
            eventName: '',
            uid: '',
            description: '',
            eventDate: '',
            eventTime: '',
            location: '',
            placeId: '',
            categories: '',
            created: null,
            website: '',
            confirmModal: false,
            file: '',
            imagePreviewUrl: '',
            cronTime: ''
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid
                })
            }
        })
        this.updateParent = (state) => this.props.updateParent(this.state)
        this.imageProcess = this.imageProcess.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val, prop) {
        this.setState({
            [prop]: val
        })
    }



    imageProcess(event) {
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


    render() {
        console.log(this.props)
        let inputProps = {
            placeholder: "Pick a Date and Time"
        }

        let timeConstraints = { minutes: { min: 0, max: 59, step: 15 } }


        var yesterday = Datetime.moment().subtract(1, 'day');
        var valid = function(current) {
            return current.isAfter(yesterday);
        };
        let confirmModalElement = null
        if (this.state.created === true) {
            confirmModalElement = (<div><h1> Congratulations, you've made an event!</h1>
            <h3>Share your event!</h3>
            <Twitter/>
            <Facebook/>
            <Email/></div>)
            return confirmModalElement
        }
        const { createEvent } = this.props
        return (
            <div>
              {confirmModalElement}
              <h1 className="createTitle"> Create Event </h1>
              <br/>
              <input required type="text"  placeholder="Name" onChange={e=>this.handleChange(e.target.value, "eventName")}  ref={(input)=>{
              this.eventName = input}}/>
              <br/>
              <input required type="text"  placeholder="Description"   onChange={e=>this.handleChange(e.target.value, "description")}/>
              <PlaceSearchForm placeholder="Address" updateParent={(location) => {
                this.setState({location: location.address, placeId: location.placeId})
              }}/>
              <br/>
              <br/>
              <input required type="date" min={moment().format('YYYY-MM-DD')}onChange={(event) => {
                this.setState({eventDate: moment(event).format("MM/DD/YYYY HH:mm")})
              }}/>
   
              <input required type="time" onChange={(event) => {
                console.log(event.target.value)
                this.setState({eventTime: event.target.value, cronTime: moment.utc(event).subtract(3, 'hours').format()})}}/>
              <div className="category-title"> Categories
              <Category className="category-button" required updateParent={(state) => {
                this.setState({categories: state})}}/>
              </div>
                <br/>
                <img src={this.state.imagePreviewUrl || this.state.eventPic} alt=""/>
              
                 <input required
                    type="file"
                    onChange={(event)=>this.imageProcess(event)} />
                    <br/>
    
              <br/>
              <button type="submit" className="submitEvent-button" onClick={(event) => {
                event.preventDefault()
                createEvent(this.state)
              }}>Submit</button>

            </div>
        )
    }


}

const mapStateToProps = (state) => { return state }

const actions = {
    createEvent
}

export default connect(mapStateToProps, actions)(CreateEvents)