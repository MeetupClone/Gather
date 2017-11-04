import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from 'axios';

import { joinGroup, leaveGroup } from "../../../ducks/group-redux"

import { fire as firebase } from "../../../fire"

export class GroupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupId: this.props.match.params.id,
            groupName: "",
            groupOrganizerUid: '',
            category: "",
            groupLocation: "",
            groupDesc: "",
            groupMembers: [],
            groupFB: "",
            groupTwitter: "",
            website: "",
            userJoinedGroups: [],
            currentUserUid: '',
            joined: false

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

        axios.get(`/api/group/${this.state.id}`).then(result => {
            this.setState({ groupName: result.data[0].name, category: result.data[0].category, groupDesc: result.data[0].description, groupFB: result.data[0].facebook, groupTwitter: result.data[0].twitter })
        })
    }

    render() {
        let that = this;
        const { joinGroup, leaveGroup } = this.props
        let joinButton = null
        let leaveButton = null
        if (!this.state.joined) {
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