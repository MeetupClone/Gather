import React, {Component} from 'react';
import { Link } from "react-router-dom";

import './footer.css'

export class Footer extends Component{
  constructor(props){
      super(props);
  }


render(){
  return(
    <div>
      <button className="footer-create-button">Create</button>
      <div className="footer-background">
      <h5 className="footer-links"><span className="footer-home">Home </span><span className="footer-home"> About </span><span className="footer-home"> Settings</span></h5>
      <h6 className="footer-milk-steak"> Milk Steak LLC</h6>
    </div>
    </div>
  )
}
}
