import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from 'axios';

import { joinGroup, leaveGroup } from 'ducks/group-redux';

import { fire as firebase } from 'fire';

import { Link } from 'react-router-dom';

import './groupPage.css';
import 'helpers.css';

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
      loading: true,
      groupEvents: [],
    };
  }

  componentWillMount() {
    let events = axios
      .get(`/api/event/group/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ groupEvents: response.data });
      });
    let userGroups = axios
      .get(`/api/groups/getUsersGroups/${this.props.uid}`)
      .then(result => {
        if (result.data.length) {
          return this.setState({
            joined: result.data.find(group => {
              return group.group_id === +this.props.match.params.id;
            }),
          });
        }
      });
    let groups = axios
      .get(`/api/group/${this.props.match.params.id}`)
      .then(result => {
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

    Promise.all([events, userGroups, groups]).then(() => {
      this.setState({ loading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ joined: nextProps.joined });
  }

  render() {
    const {
      edit,
      loading,
      joined,
      groupPic,
      groupId,
      category,
      groupName,
      currentUserUid,
      groupOrganizerUid,
      groupMembers,
      groupDesc,
      groupEvents,
    } = this.state;

    if (edit) {
      return <GroupDashboard props={this.state} />;
    }
    return loading ? null : (
      <div className="nunito-text">
        <div className="group-page-flex-box">
          <img
            src={groupPic || require(`categorypics/${category}.webp`)}
            alt=""
            className="group-page-picture"
          />
          <h2>{groupName}</h2>

          {!joined && currentUserUid !== groupOrganizerUid ? (
            <button
              className="join-button"
              onClick={() => {
                this.props.joinGroup({
                  groupid: groupId,
                  uid: this.props.uid,
                });
                this.setState({ joined: true });
              }}>
              Join This Group
            </button>
          ) : (
            <div>
              <h3> You are in this group! </h3>
              <button
                className="leave-button"
                onClick={() => {
                  this.props.leaveGroup({
                    groupid: groupId,
                    uid: this.props.uid,
                  });
                  this.setState({ joined: false });
                }}>
                Leave Group
              </button>
            </div>
          )}
        </div>
        <div className="group-page-description">
          <h4>
            {groupMembers}
            {groupMembers !== '1' ? ' Member(s)' : ' Member'}
          </h4>
          <p>{groupDesc}</p>
        </div>
        <div className="group-page-share">
          <Twitter />
          <Facebook />
          <Email />
        </div>
        <div>
          {groupEvents.map((key, i) => {
            return (
              <Link key={i} to={`/event/${key.id}`}>
                <img
                  src={
                    key.event_image ||
                    `../../../assets/web-p-category-pics/${category}` ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VYjjU6OM1lm1QyggD1_ShdKTc-kWDT-FcCeL5qlYCg2oZxIWQg'
                  }
                  alt="event img"
                />
                <p>{key.title}</p>
                <p>{key.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ AuthenticationReducer, GroupReducer }) => {
  return { uid: AuthenticationReducer.uid, joined: GroupReducer.joined };
};

const actions = {
  joinGroup,
  leaveGroup,
};

export default connect(mapStateToProps, actions)(GroupPage);
