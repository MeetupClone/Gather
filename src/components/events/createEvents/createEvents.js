import React, {Component} from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
=======
import redux from 'react-redux';

>>>>>>> 0e287130ca5c2d031e0167f06182241b2c197b02

export default class CreateEvent extends Component{
  constructor(props){
  super(props)

<<<<<<< HEAD
=======
export default class CreateEvents extends Component{
  constructor(props){
  super(props)

>>>>>>> 0e287130ca5c2d031e0167f06182241b2c197b02

this.state = {
  eventPic: '',
  eventName: '',
  uid: '',
  description: '',
  location: '',
<<<<<<< HEAD
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
=======
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
>>>>>>> 0e287130ca5c2d031e0167f06182241b2c197b02
