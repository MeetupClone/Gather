import React, {Component} from 'react';
import { Link } from "react-router-dom";

import { fire as firebase } from "../../../fire"

export class Footer extends Component{
  constructor(props){
      super(props);

    this.state = {
      user: false,
    }

    firebase.auth().onAuthStateChanged(user => {
      console.log()
      if (user) {
          this.setState({
              user: true,
          })
      }
  })

  }


render(){
  if(this.state.user){
    return(
      <div>
        <Link to = "/event/create"><h4>Create</h4></Link>
        <h5><Link to = "/"><span>Home </span></Link><Link to = ""><span> About </span></Link><Link to = "/user/account"><span> Settings</span></Link></h5>
        <h6> This is for educational purposes</h6>
      </div>
    )
  }
  else{
    return(
      <div>
        <Link to = "/login"><h4>Create</h4></Link>
        <h5><Link to = "/"><span>Home </span></Link><Link to = ""><span> About </span></Link><Link to = "/login"><span> Settings</span></Link></h5>
        <h6> This is for educational purposes</h6>
      </div>
    )
  }
  
}
}
