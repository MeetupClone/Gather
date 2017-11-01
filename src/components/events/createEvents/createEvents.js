import React, {Component} from 'react';
import { connect } from 'react-redux';
import redux from 'react-redux';
import axios from 'axios';

import './createEvents.css';


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



  render(){
    let confirmModalElement = null
    if (this.state.confirmModal === true){
      confirmModalElement = (<h1> You've made an event</h1>)
      return confirmModalElement
    }
      // const {eventPic, eventName, uid, description, location, category} = this.props
        return(
            <div>
              {confirmModalElement}
              <h1 className="createTitle"> Create Event </h1>
              <form>
                <br/><input type="text"  placeholder="Name" ref={(input)=>{this.eventName = input}}/>
                <br/>

                <br/><input  type="text"  placeholder="Description"   ref={(input)=>{this.description = input}}/>
                <br/>
                <br/><input  type="text" placeholder="Location" ref={(input)=>{this.location=input}}/>
                <br/>
                <br/><input  type="text" placeholder="Category" ref={(input)=>{this.category=input}}/>
                <br/>
                <br/><input  type="text" placeholder="Website" ref={(input)=>{this.website=input}}/>
                <br/>
                <br/>
              </form><button className="upload-button"  type="text" ref={(input)=>{this.eventPic = input}}>Upload Picture</button>
              <br/>
              <br/>
              <button className="submitEvent-button" onClick={(event)=>{
                event.preventDefault();
                this.createEvent(this.eventPic, this.eventName, this.uid, this.description, this.location, this.category, this.created, this.website)}}>Submit</button>
            </div>
    )
  }


}

const mapStateToProps = (state) => { return {} }
const actions = {
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

export default connect(mapStateToProps, actions)(CreateEvents)
