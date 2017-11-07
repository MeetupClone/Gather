import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from 'axios';

import { joinGroup, leaveGroup } from "../../../ducks/group-redux"

import { fire as firebase } from "../../../fire"

import {Link} from "react-router-dom";


import GroupDashboard from "../groupDashboard/groupDashboard";

export class GroupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupId: this.props.match.params.id,
            groupName: "",
            groupOrganizerUid: '',
            groupPic: '',
            category: "",
            groupLocation: "",
            groupDesc: "",
            groupMembers: [],
            groupFB: "",
            groupTwitter: "",
            website: "",
            userJoinedGroups: [],
            currentUserUid: '',
            joined: false,
            edit: false,
            groupEvents: []

        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ currentUserUid: user.uid })
                axios.get(`/api/groups/getUsersGroups/${this.state.currentUserUid}`).then(result => {
                    if (result.data.length) {
                        result.data.map(group => {
                            let groupsArr = []
                            groupsArr.push(group.id)
                            return this.setState({ userJoinedGroups: groupsArr })
                        })
                    }
                })

            }
            
            
        })

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        console.log(this.state.groupId)
        axios.get(`/api/event/group/${this.state.groupId}`).then(response => {
            console.log(response.data)
            this.setState({groupEvents: response.data})})

        axios.get(`/api/group/${this.props.match.params.id}`).then(result => {
            this.setState({ groupName: result.data[0].name, 
                category: result.data[0].category, 
                groupDesc: result.data[0].description, 
                groupPic: result.data[0].group_picture,
                groupFB: result.data[0].facebook, 
                groupOrganizerUid: result.data[0].group_owner_uid,
                groupTwitter: result.data[0].twitter })
        })
    }

    render() {
        console.log(this.state)
        let that = this;
        const { joinGroup, leaveGroup } = this.props
        let joinButton = null
        let leaveButton = null

        if (this.state.currentUserUid === this.state.groupOrganizerUid)
            {
            joinButton = (
                <div>
                    <h1> This is your group! </h1>
                    <button onClick={() => {this.setState({edit:true})}}> Click here to go to your group dashboard </button>
                </div>
                )
        }

        if (this.state.edit) {
            console.log("yo")
            return (<GroupDashboard props={this.state}/>)
        }


        if (!this.state.joined && this.state.currentUserUid !== this.state.groupOrganizerUid) {
            joinButton = (<button onClick={(event) => {
                joinGroup(this.state);
                that.setState({joined: true})
            }}> Join This Group </button>)


        } else if (this.state.joined) {
            joinButton = (<h1> You are in this group! </h1>)
            leaveButton = (<button onClick={(event) => {
                leaveGroup(this.state)
                that.setState({joined: false})
            }}> Leave Group </button>)
        }


        return (
            <div>
            {joinButton}
            {leaveButton}
                <h1>GROUP PAGE</h1>
                <h1>{this.state.groupName}</h1>
                <h3>{this.state.groupDesc}</h3>
                <div>{this.state.groupEvents.map(key => {
                    return(
                        <div>
                            <img src={key.event_image} alt="event img"/>
                            <Link to={`/event/${key.id}`}><p>{key.title}</p></Link>
                            <p>{key.description}</p>
                        </div>
                    )
                })}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => { return {} }

const actions = {
    joinGroup,
    leaveGroup
}

export default connect(mapStateToProps, actions)(GroupPage)