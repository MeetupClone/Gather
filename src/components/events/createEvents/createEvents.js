import React, {Component} from 'react';
import { connect } from 'react-redux';

export default class CreateEvent extends Component{
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
      const {eventPic, eventName, uid, description, location, category} = this.props
        return(
            <div>
              <form>
                <input  type={text} ref={(input)=>{this.eventName = input}}/>
                  <input name=eventPic type=text ref=(input)=>{this.eventPic = input}/>

                   <input name=description type=text ref=(input)=>{this.description = input}/>
                      <input name=location type=location ref=(input)=>{this.location=input}/>
                        <input name=category type=category ref=(input)=>{this.category=input}/>
                        </form>
                      </div>
                      }
                      )

                     }