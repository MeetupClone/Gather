import React, { Component } from 'react';

import axios from "axios";

import "./editableProfile.css"
import "../profile.css"

import { fire as firebase } from "../../../fire";


export default class EditableProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            uid: '',
            userProfilePic: '',
            userName: '',
            userLocation: '',
            userDescription: '',
            editable: false,
            showParams: '',
            twitter: '',
            facebook: '',
            instagram: ''
        };

        this.updateProfile= this.updateProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
    uploadImage(event) {
        event.preventDefault();
        let userId = this.state.uid
        let file = this.state.file
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('profilePictures/' + file.name).put(file);
        uploadTask.on('state_changed', (snapshot) => {}, function(error) {}, function() {
            let downloadURL = uploadTask.snapshot.downloadURL;
            axios.post('/api/pictures/upload', ["user", downloadURL, userId]).then(downloadURL => {
                this.setState({ userProfilePic: downloadURL, imagePreviewUrl: downloadURL })
                console.log(this.state)
            })
        });
    }

    updateProfile() {
    	axios.post('/api/user/profile/update', this.state).then(result => {
    		console.log("updated")
    	})
    	console.log(this.state)
    }

    handleChange(event) {
        this.setState({ userDescription: event.target.value });
    };


    componentWillMount() {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid
                })
            }
            let userId = this.state.uid
            axios.get(`/api/user/getUserInfo/${userId}`).then(result => {
                this.setState({
                    userName: result.data[0].name,
                    userProfilePic: result.data[0].profile_image,
                    userLocation: result.data[0].location,
                    userDescription: result.data[0].description
                })
            })
        })



    }


    render() {
        return (
            <div className="previewComponent">
                <div>
                <img className="user-profile-pic" src={this.state.imagePreviewUrl || this.state.userProfilePic} alt={this.state.userName}/>
                <form onSubmit={(event)=>this.uploadImage(event)}>
                 <input className="fileInput" 
                    type="file" 
                    onChange={(event)=>this.submitImageUpload(event)} />
                <button className="submitButton" 
                    type="submit" 
                    onClick={(event)=>this.uploadImage(event)}>Upload Image</button>
                </form>
                <h1> {this.state.userName} </h1>
                <h3> {this.state.userLocation} </h3>

                <textarea id="noter-text-area" name="editableDescription" value={this.state.userDescription} onChange={this.handleChange}></textarea>
                <div>
                Twitter
                <br/>
                <input className="social-media-input" onChange={(event) => {
                	this.setState({twitter: event.target.value})}} />
                </div>
                <div>
                Facebook
                <br/>
                <input className="social-media-input" onChange={(event) => {
                	this.setState({facebook: event.target.value})}} />
                </div>
                <div>
                Instagram
                <br/>
                <input className="social-media-input" onChange={(event) => {
                	this.setState({instagram: event.target.value})}} />
                </div>

                <button onClick={() => {
                	this.updateProfile()
                }}> Save Profile </button>


                <div className="user-spec-buttons">
                <button className="user-spec-button-indiv" onClick={() => 
                    {this.setState({showParams: "events" })}}> Events </button>
                <button className="user-spec-button-indiv" onClick={() => 
                    {this.setState({showParams: "attending" })}}> Attending </button>
                <button className="user-spec-button-indiv" onClick={() => 
                    {this.setState({showParams: "groups" })}}> Groups </button>
                </div>

                </div> 
            </div>
        )
    }

}