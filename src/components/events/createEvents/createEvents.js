import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fire as firebase } from "../../../fire"
import './createEvents.css';
import { createEvent } from "../../../ducks/event-redux"
import PlaceSearchForm from "../../placeSearchForm/placeSearchForm";
import Category from "../../categories/category"

import Datetime from "react-datetime"
import moment from "moment"

import axios from 'axios';


export class CreateEvents extends Component {
    constructor(props) {
        super(props)

        this.state = {
            eventPic: '',
            eventName: '',
            uid: '',
            description: '',
            eventDate: '',
            location: '',
            placeId: '',
            category: '',
            created: false,
            website: '',
            confirmModal: false,
            file: '',
            imagePreviewUrl: '',
            cronTime: '',
            groups: null,
            eventGroup: '',
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid
                })
            }
            axios.get(`/api/group/owner/${this.state.uid}`).then(response => {
                console.log(response)
                this.setState({groups: response.data})
            
            })
        })
        this.imageProcess = this.imageProcess.bind(this)
        this.handleChange = this.handleChange.bind(this)



    }

    handleChange(val, prop) {
        console.log(val, prop)
        this.setState({
            [prop]: val
        })
        console.log(this.state)
    }

    componentWillMount(){
        
        
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
        let inputProps = {
            placeholder: "Pick a Date and Time"
        }

        let timeConstraints = { minutes: { min: 0, max: 59, step: 15 } }

        let groupSection = null

        if(this.state.groups){
            groupSection = (<div>
                <h4>Would you like to add a group?</h4>
                <ol>
                    {this.state.groups.map(key => {
                        return(
                            <li><button onClick={e=>this.setState({eventGroup: key.id})}>{key.name}</button></li>
                        )
                    })}
                    <li><button onClick={e=>this.setState({eventGroup: null})}>No Group</button></li>
                </ol>


            </div>)
        }

        var yesterday = Datetime.moment().subtract(1, 'day');
        var valid = function(current) {
            return current.isAfter(yesterday);
        };
        let confirmModalElement = null
        if (this.state.created === true) {
            confirmModalElement = (<h1> You've made an event</h1>)
            return confirmModalElement
        }
        const { createEvent } = this.props
        return (
            <div>
              {confirmModalElement}
              <h1 className="createTitle"> Create Event </h1>
              <br/><input type="text"  placeholder="Name" onChange={e=>this.handleChange(e.target.value, "eventName")}  ref={(input)=>{
              this.eventName = input}}/>
              <br/>

              <br/><input  type="text"  placeholder="Description"   onChange={e=>this.handleChange(e.target.value, "description")}  ref={(input)=>{
              this.description = input}}/>
              <br/>
              <br/>
              <PlaceSearchForm palceholder="Address" updateParent={(location) => {
                this.setState({location: location.address, placeId: location.placeId})
              }}/>
              <br/>
              <br/>
              <Datetime isValidDate={ valid } inputProps={inputProps} timeConstraints={timeConstraints} onChange={(event) => {
                this.setState({eventDate: moment(event).format("MM/DD/YYYY HH:mm"), cronTime: moment.utc(event).subtract(3, 'hours').format()})
              }}/>
              {groupSection}
              <input  type="text" placeholder="Category" onChange={e=>this.handleChange(e.target.value, "category")}  ref={(input)=>{
              this.category=input}}/>
              <Category/>

                <br/>
                <br/><input  type="text" placeholder="Website" onChange={e=>this.handleChange(e.target.value, "website")}  ref={(input)=>{
                this.website=input}}/>
                <br/>
                <br/>
                <img src={this.state.imagePreviewUrl || this.state.eventPic} alt=""/>
                <form>
                 <input
                    type="file"
                    onChange={(event)=>this.imageProcess(event)} />
                    <br/>
                </form>
              <br/>
              <button className="submitEvent-button" onClick={(event) => {
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
