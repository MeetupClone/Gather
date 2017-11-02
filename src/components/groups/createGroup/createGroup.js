import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createGroup} from "../../../ducks/create-group-redux"

export class CreateGroup extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            category: '',
            description: '',
            website: '',
            twitter: '',
            facebook: '',
            instagram: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val, prop){
        this.setState({ [prop]: val })
    }

    render(){
      const {createGroup} = this.props
        let confirmModalElement = null
        if (this.state.confirmModal === true){
            confirmModalElement = (<h1>You made a group!</h1>)
            return confirmModalElement
        }
        return(
            <div>
              {confirmModalElement}
              <h1>Create Group</h1>
              <form>
                <input type="text" placeholder="Name" onChange={e=>this.handleChange(e.target.value, "name")} ref={(input) => {this.name = input}}></input>
                <input type="text" placeholder="Category" onChange={e=>this.handleChange(e.target.value, "category")} ref={(input) => {this.category = input}}></input>
                <input type="text" placeholder="Description" onChange={e=>this.handleChange(e.target.value, "description")} ref={(input) => {this.description = input}}></input>
                <input type="text" placeholder="Website" onChange={e=>this.handleChange(e.target.value, "website")} ref={(input) => {this.website = input}}></input>
                <input type="text" placeholder="Twitter" onChange={e=>this.handleChange(e.target.value, "twitter")} ref={(input) => {this.twitter = input}}></input>
                <input type="text" placeholder="Facebook" onChange={e=>this.handleChange(e.target.value, "facebook")} ref={(input) => {this.facebook = input}}></input>
                <input type="text" placeholder="Instagram" onChange={e=>this.handleChange(e.target.value, "instagram")} ref={(input) => {this.instagram = input}}></input>
              </form>
              <button onClick={(event) => {
                console.log("state", this.state)
                event.preventDefault()
                createGroup(this.state).then(result => {
                  if(result === true){
                    this.setState({confirmModal: true})
                  }
                        })
                    }}>Submit</button>
            </div>
        )
    }
}



const mapStateToProps = (state) => { return {} }

const actions = {
    createGroup
}

export default connect(mapStateToProps, actions)(CreateGroup)
