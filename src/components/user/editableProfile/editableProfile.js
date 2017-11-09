import React, { Component } from 'react';

import axios from "axios";

import "./editableProfile.css"
import "../profile/profile.css"

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
            updated: false,
            showParams: '',
            twitter: '',
            facebook: '',
            instagram: ''
        };

        this.updateProfile = this.updateProfile.bind(this);
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
            this.setState({ userProfilePic: downloadURL, imagePreviewUrl: downloadURL })
            axios.post('/api/user/profile/update', this.state).then(result => {
                this.setState({ updated: true })
            })
        })
    }

    updateProfile() {
        axios.post('/api/user/profile/update', this.state).then(result => {
            this.setState({ updated: true })
        })
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
        let updated = null
        if (this.state.updated) {
            updated = (
                <div> <h1>Your profile has been updated.</h1> </div>
            )
        }
        return (
            <div className="previewComponent">
                <div>
                <img className="user-profile-pic" src={this.state.imagePreviewUrl || this.state.userProfilePic} alt={this.state.userName}/>
                 <input className="fileInput" 
                    type="file" 
                    onChange={(event)=>this.submitImageUpload(event)} />
                <h1> {this.state.userName} </h1>
                <h3> {this.state.userLocation} </h3>

                <textarea id="noter-text-area" name="editableDescription" value={this.state.userDescription} onChange={this.handleChange}></textarea>
                <div>
                <input placeholder="Twitter" className="social-media-input" onChange={(event) => {
                    this.setState({twitter: event.target.value})}} />
                </div>
                <div>
                <input placeholder="Facebook" className="social-media-input" onChange={(event) => {
                    this.setState({facebook: event.target.value})}} />
                </div>
                <div>
                <input placeholder="Instagram" className="social-media-input" onChange={(event) => {
                    this.setState({instagram: event.target.value})}} />
                </div>

                <button className="edit-profile-save" onClick={() => {
                    this.updateProfile(this.state).then(result => {
                        this.setState({editable: false})
                    })
                }}> Save Profile </button>


                </div> 
            </div>
        )
    }

}