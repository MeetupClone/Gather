import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from 'axios';

import { joinGroup, leaveGroup } from '../../../ducks/group-redux';

import { fire as firebase } from '../../../fire';

import { Link } from 'react-router-dom';

import './groupPage.css';
import '../../../helpers.css';

import Twitter from '../../twitter/twitter';
import Facebook from '../../facebook/facebook';
import Email from '../../email/email';

import GroupDashboard from '../groupDashboard/groupDashboard';

export class GroupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupId: this.props.match.params.id,
            groupName: '',
            groupOrganizerUid: '',
            groupPic: '',
            category: '',
            groupLocation: '',
            groupDesc: '',
            groupMembers: 0,
            groupFB: '',
            groupTwitter: '',
            website: '',
            userJoinedGroups: [],
            currentUserUid: '',
            joined: false,
            edit: false,
            groupEvents: [],
        };

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ currentUserUid: user.uid });
                axios
                    .get(
                        `/api/groups/getUsersGroups/${
                            this.state.currentUserUid
                        }`
                    )
                    .then(result => {
                        if (result.data.length) {
                            result.data.map(group => {
                                let groupsArr = [];
                                groupsArr.push(group.id);
                                return this.setState({
                                    userJoinedGroups: groupsArr,
                                });
                            });
                        }
                    });
            }
        });

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        axios.get(`/api/event/group/${this.state.groupId}`).then(response => {
            this.setState({ groupEvents: response.data });
        });

        axios.get(`/api/group/${this.props.match.params.id}`).then(result => {
            this.setState({
                groupName: result.data[0].name,
                category: result.data[0].category,
                groupDesc: result.data[0].description,
                groupPic: result.data[0].group_picture,
                groupFB: result.data[0].facebook,
                groupOrganizerUid: result.data[0].group_owner_uid,
                groupTwitter: result.data[0].twitter,
                groupMembers: result.data[0].members,
            });
        });
    }

    render() {
        let that = this;
        const { joinGroup, leaveGroup } = this.props;
        let joinButton = null;
        let leaveButton = null;
        let groupImage = null;

        if (this.state.category) {
            groupImage = require(`../../../web-p-category-pics/${
                this.state.category
            }.webp`);
        }

        if (this.state.currentUserUid === this.state.groupOrganizerUid) {
            joinButton = (
                <div className="group-page-specific-container">
                    <h4> This is your group! </h4>
                    <button
                        className="group-page-join-button"
                        onClick={() => {
                            this.setState({ edit: true });
                        }}>
                        {' '}
                        Click here to go to your group dashboard{' '}
                    </button>
                </div>
            );
        }

        if (this.state.edit) {
            return <GroupDashboard props={this.state} />;
        }

        if (
            !this.state.joined &&
            this.state.currentUserUid !== this.state.groupOrganizerUid
        ) {
            joinButton = (
                <button
                    onClick={event => {
                        joinGroup(this.state);
                        that.setState({ joined: true });
                    }}>
                    {' '}
                    Join This Group{' '}
                </button>
            );
        } else if (this.state.joined) {
            joinButton = <h1> You are in this group! </h1>;
            leaveButton = (
                <button
                    onClick={event => {
                        leaveGroup(this.state);
                        that.setState({ joined: false });
                    }}>
                    {' '}
                    Leave Group{' '}
                </button>
            );
        }

        return (
            <div className="nunito-text">
                <div className="group-page-flex-box">
                    <div>
                        <h1>{this.state.groupName}</h1>
                        <h3>{this.state.groupMembers} Member(s)</h3>
                        {joinButton}
                        {leaveButton}
                    </div>
                    <img
                        src={this.state.groupPic || groupImage}
                        alt=""
                        className="group-page-picture"
                    />
                </div>
                <p className="group-page-description">{this.state.groupDesc}</p>

                <div className="group-page-share">
                    <Twitter />
                    <Facebook />
                    <Email />
                </div>
                <div>
                    {this.state.groupEvents.map(key => {
                        return (
                            <div>
                                {/* <img src={key.event_image || `../../../assets/web-p-category-pics/${this.state.category}` || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VYjjU6OM1lm1QyggD1_ShdKTc-kWDT-FcCeL5qlYCg2oZxIWQg"} alt="event img"/> */}
                                <Link to={`/event/${key.id}`}>
                                    <p>{key.title}</p>
                                </Link>
                                <p>{key.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const actions = {
    joinGroup,
    leaveGroup,
};

export default connect(mapStateToProps, actions)(GroupPage);
