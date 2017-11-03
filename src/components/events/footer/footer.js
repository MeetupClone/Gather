import React, {Component} from 'react';
import { Link } from "react-router-dom";

export class Footer extends Component{
  constructor(props){
      super(props);
  }


render(){
  return(
    <div>
      <h4>Create</h4>
      <h5><span>Home </span><span> About </span><span> Settings</span></h5>
      <h6> This is for educational purposes</h6>
    </div>
  )
}
}
