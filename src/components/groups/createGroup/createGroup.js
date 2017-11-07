import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGroup } from "../../../ducks/group-redux"
import { fire as firebase } from "../../../fire"
import Category from "../../categories/category"
export class CreateGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            category: '',
            description: '',
            website: '',
            twitter: '',
            facebook: '',
            instagram: '',
            uid: '',
            file: '',
            imagePreviewUrl: '',
            created: false
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ uid: user.uid })
            }
        })
        this.imageProcess = this.imageProcess.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val, prop) {
        this.setState({
            [prop]: val
        })
    }


    imageProcess(event) {
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
        const { createGroup } = this.props
        let confirmModalElement = null
        if (this.state.confirmModal === true) {
            confirmModalElement = (<h1>You made a group!</h1>)
            return confirmModalElement
        }
        return (
            <div>
              {confirmModalElement}
              <h1>Create Group</h1>
              <form>
                <input type="text" placeholder="Name" onChange={e=>this.handleChange(e.target.value, "name")} ref={(input) => {this.name = input}}></input>
                <input type="text" placeholder="Category" onChange={e=>this.handleChange(e.target.value, "category")} ref={(input) => {this.category = input}}></input>
                <input type="text" placeholder="Description" onChange={e=>this.handleChange(e.target.value, "description")} ref={(input) => {this.description = input}}></input>
                <img src={this.state.imagePreviewUrl || this.state.eventPic} alt=""/>
                <input
                  type="file"
                  onChange={(event)=>this.imageProcess(event)} />
                <Category/>
                <input type="text" placeholder="Website" onChange={e=>this.handleChange(e.target.value, "website")} ref={(input) => {this.website = input}}></input>
                <input type="text" placeholder="Twitter" onChange={e=>this.handleChange(e.target.value, "twitter")} ref={(input) => {this.twitter = input}}></input>
                <input type="text" placeholder="Facebook" onChange={e=>this.handleChange(e.target.value, "facebook")} ref={(input) => {this.facebook = input}}></input>
                <input type="text" placeholder="Instagram" onChange={e=>this.handleChange(e.target.value, "instagram")} ref={(input) => {this.instagram = input}}></input>
              </form>
              <button onClick={(event) => {
                event.preventDefault()
                createGroup(this.state)
                this.setState({confirmModalElement: true})
                    }}>Submit</button>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    console.log(state)
    return state }

const actions = {
    createGroup
}

export default connect(mapStateToProps, actions)(CreateGroup)
