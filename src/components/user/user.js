import React, { Component } from 'react';

import { fire as firebase } from "../../fire";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { file: '', imagePreviewUrl: '' };
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
        let file = this.state.file
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('profilePictures/' + file.name).put(file);
        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot)
        }, function(error) {}, function() {
            let downloadURL = [uploadTask.snapshot.downloadURL];
            console.log(downloadURL)
        });
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="imagePicDude"/>);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className="previewComponent">
        <form onSubmit={(e)=>this.uploadImage(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this.submitImageUpload(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this.uploadImage(e)}>Upload Image</button>
        </form>
      </div>
        )
    }
}