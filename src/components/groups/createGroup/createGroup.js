import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGroup } from "../../../ducks/group-redux"
import { fire as firebase } from "../../../fire"
import Category from "../../categories/category"

import "./createGroup.css";


export class CreateGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            categories: '',
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
        this.imageProcess = this.imageProcess.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateParent = (state) => this.props.updateParent(this.state)
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
                
                <img className="group-picture" src={this.state.imagePreviewUrl || this.state.eventPic} alt=""/>
                 <input id="input" className="input-picture btn-active"
                    type="file"
                    onChange={(event)=>this.imageProcess(event)} />
                    <label className="input-label" htmlFor="input"> Add a Group Photo </label>
                </form>
                <input type="text" placeholder="Name" onChange={e=>this.handleChange(e.target.value, "name")} />
                <input type="text" placeholder="Description" onChange={e=>this.handleChange(e.target.value, "description")} />
                <Category updateParent={(state) => {
                this.setState({categories: state})}}/>                
                <input type="text" placeholder="Website" onChange={e=>this.handleChange(e.target.value, "website")} ></input>
                <input type="text" placeholder="Twitter" onChange={e=>this.handleChange(e.target.value, "twitter")} ></input>
                <input type="text" placeholder="Facebook" onChange={e=>this.handleChange(e.target.value, "facebook")} ></input>
                <input type="text" placeholder="Instagram" onChange={e=>this.handleChange(e.target.value, "instagram")} ></input>
                    <button className="submit-group-button btn-active" onClick={(event) => {
                event.preventDefault()
                createGroup(this.state)
                this.setState({confirmModalElement: true})
                    }}>Submit</button>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return state
}

const actions = {
    createGroup
}

export default connect(mapStateToProps, actions)(CreateGroup)