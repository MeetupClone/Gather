// import React, {Component} from 'react';
// import { connect } from 'react-redux';
// import redux from 'react-redux';
// import { fire as firebase } from "../fire";
// import axios from 'axios';

// import './createEvents.css';


// export default class CreateEvents extends Component{
//   constructor(props){
//   super(props)



// this.state = {
//   eventPic: '',
//   eventName: '',
//   // uid: '',
//   description: '',
//   location: '',
//   category: '',
//   created: false,
//   website: ''
// }
// }


// CreateEvent(eventPic,  eventName, description, location, category, created, website)=>{
//   axios.post(/createEvents, eventPic,  eventName, description, location, category, website ).then(result=>{this.setState{eventPic,  eventName, description, location, category, created: 'true', website}}
//   return(let {created} = this.state if(created){confirmModal = ("Congrats! You made an Event!")}) )
// }



//   render(){
//       // const {eventPic, eventName, uid, description, location, category} = this.props
//         return(
//             <div>

//               <h1 className="createTitle"> Create Event </h1>
//               <form>
//                 <br/><input type="text"  placeholder="Name" ref={(input)=>{this.eventName = input}}/>
//                 <br/>

//                 <br/><input  type="text"  placeholder="Description"   ref={(input)=>{this.description = input}}/>
//                 <br/>
//                 <br/><input  type="text" placeholder="Location" ref={(input)=>{this.location=input}}/>
//                 <br/>
//                 <br/><input  type="text" placeholder="Category" ref={(input)=>{this.category=input}}/>
//                 <br/>
//                 <br/><input  type="text" placeholder="Website" ref={(input)=>{this.website=input}}/>
//                 <br/>
//                 <br/>
//               </form><button className="upload-button"  type="text" ref={(input)=>{this.eventPic = input}}>Upload Picture</button>
//               <br/>
//               <br/>
//               <button className="submitEvent-button" onClick{(event)=>{event.preventDefault() createEvents{eventPic, eventName, uid,description,
//                 location,
//                 category,
//                 created,
//               website}}}>Submit</button>
//             </div>
//     )
//   }


// }

// const mapStateToProps = (state) => { return {} }
// const actions = {eventPic, eventName, uid, description, location, category}

// export default connect(mapStateToProps, actions)(CreateEvent)
