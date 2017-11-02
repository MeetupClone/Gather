import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from "axios";
import { fire as firebase } from "../../../fire"
import './createEvents.css';
import { createEvent } from "../../../ducks/create-event"

export class CreateEvents extends Component {
    constructor(props) {
        super(props)

        this.state = {
            eventPic: '',
            eventName: '',
            uid: '',
            description: '',
            location: '',
            category: '',
            created: false,
            website: '',
            confirmModal: false,
            file: '',
            imagePreviewUrl: ''
        }

        firebase.auth().onAuthStateChanged(user => {
            console.log()
            if (user) {
                this.setState({
                    uid: user.uid
                })
            }
        })
        this.submitImageUpload = this.submitImageUpload.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val, prop) {
        this.setState({
            [prop]: val
        })
    }


    submitImageUpload(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }


    render() {
        let confirmModalElement = null
        if (this.state.created === true) {
            confirmModalElement = (<h1> You've made an event</h1>)
            return confirmModalElement
        }
        const { createEvent } = this.props
        return (
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
              </form>
              <img src={this.state.imagePreviewUrl || this.state.eventPic} alt={this.state.eventName}/>
                <form onSubmit={(event)=>this.uploadImage(event)}>
                 <input
                    type="file" 
                    onChange={(event)=>this.submitImageUpload(event)} />
                    <br/>
                </form>
              <br/>
              <button className="submitEvent-button" onClick={(event) => {
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