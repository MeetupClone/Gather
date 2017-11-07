import React, {Component} from 'react';
import { Link } from "react-router-dom";

import { fire as firebase } from "../../fire";

import "./footer.css";

export default class Footer extends Component{
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
        <Link to="/event/create">
      <button className="footer-create-button">Create</button>
        </Link>
      <div className="footer-background">
      <h5 className="footer-links"><Link to="/" className="footer-home">Home </Link><Link to="/faq"> About </Link><span className="footer-home"> Settings</span></h5>
      <h6 className="footer-milk-steak"> Milk Steak LLC</h6>
    </div>
    </div>
    )
  }
  else{
    return(
      <div>
        <Link to="/login">
      <button className="footer-create-button">Create</button>
        </Link>
      <div className="footer-background">
      <h5 className="footer-links"><Link to="/" className="footer-home">Home </Link><Link to="/faq"> About </Link><Link to="/user/account" className="footer-home"> Settings</Link></h5>
      <h6 className="footer-milk-steak"> Milk Steak LLC</h6>
    </div>
    </div>
    )
  }
  
}
}
