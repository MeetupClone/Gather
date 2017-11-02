
import React, {Component} from 'react';
import { connect } from 'react-redux';
import redux from 'react-redux';
import axios from 'axios';

import './createEvents.css';
import {createEvent} from "../../../ducks/create-event"

export class CreateEvents extends Component{
  constructor(props){
  super(props)



this.state = {
  eventPic: '',
  eventName: '',
  // uid: '',
  description: '',
  location: '',
  category: '',
  created: false,
  website: '',
  confirmModal: false
}

this.handleChange = this.handleChange.bind(this);
}



//   createEvent(eventPic,  eventName, description, location, category, created, website)  {
//
//     if (eventPic.length > 0 && eventName.length > 0){
//       this.setState({confirmModal: true})
//     }
//     // let eventDetails = [eventPic,  eventName, description, location, category, created, websites]
//     // axios.post('/api/event/create' , [eventDetails]).then(result=>{
//       this.setState({eventPic,  eventName, description, location, category, created: 'true', website})
//       // let {created} = this.state
//       if(this.state.created){
//         this.setState({confirmModal: true})
//     }
//
// }

  handleChange(val, prop){
    this.setState({ [prop]: val })
  }

  render(){

    console.log(this.props)
    let confirmModalElement = null
    if (this.state.confirmModal === true){
      confirmModalElement = (<h1> You've made an event</h1>)
      return confirmModalElement
    }
      const {createEvent} = this.props
        return(
            <div>
              {confirmModalElement}
              <h1 className="createTitle"> Create Event </h1>
              <form>
                <br/><input type="text"  placeholder="Name" onChange={e=>this.handleChange(e.target.value, "eventName")}  ref={(input)=>{
                this.eventName = input}}/>
                <br/>

                <br/><input  type="text"  placeholder="Description"   onChange={e=>this.handleChange(e.target.value, "description")}  ref={(input)=>{
                this.description = input}}/>
                <br/>
                <br/><input  type="text" placeholder="Location" onChange={e=>this.handleChange(e.target.value, "location")}  ref={(input)=>{
                this.location=input}}/>
                <br/>
                <br/><input  type="text" placeholder="Category" onChange={e=>this.handleChange(e.target.value, "category")}  ref={(input)=>{
                this.category=input}}/>
                <br/>
                <br/><input  type="text" placeholder="Website" onChange={e=>this.handleChange(e.target.value, "website")}  ref={(input)=>{
                this.website=input}}/>
                <br/>
                <br/>
              </form><button className="upload-button"  type="text" onChange={e=>this.handleChange(e.target.value, "")}  ref={(input)=>{this.eventPic = input}}>Upload Picture</button>
              <br/>
              <br/>
              <button className="submitEvent-button" onClick={(event)=>{
                console.log("state",this.state)
                event.preventDefault()
                createEvent(this.state)
              }}>Submit</button>
            </div>
    )
  }


}

const mapStateToProps = (state) => { return {} }

const actions = {
  createEvent
}

export default connect(mapStateToProps, actions)(CreateEvents)
