import React, {Component} from 'react';
import { connect } from 'react-redux';
import redux from 'react-redux';



export default class CreateEvents extends Component{
  constructor(props){
  super(props)


this.state = {
  eventPic: '',
  eventName: '',
  uid: '',
  description: '',
  location: '',
  category: ''
}
}

  render(){
      // const {eventPic, eventName, uid, description, location, category} = this.props
        return(
            <div>

              <h1> Create Event </h1>
              <form>
                <input type="text" ref={(input)=>{this.eventName = input}}/>
                <input type="text" ref={(input)=>{this.eventPic = input}}/>

                <input  type="text" ref={(input)=>{this.description = input}}/>
                <input  type="text" ref={(input)=>{this.location=input}}/>
                <input  type="text" ref={(input)=>{this.category=input}}/>
              </form>
            </div>
    )
  }


}

// const mapStateToProps = (state) => { return {} }
// const actions = {eventPic, eventName, uid, description, location, category}

// export default connect(mapStateToProps, actions)(CreateEvent)
