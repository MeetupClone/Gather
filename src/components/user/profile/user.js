import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';

import axios from 'axios';
import { connect } from 'react-redux';

import './profile.css';
import 'helpers.css';
import Footer from 'components/footer/footer';

import EditableProfile from '../editableProfile/editableProfile';

class Profile extends Component {
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
      loading: true,
      editable: false,
      prefSettings: false,
      showParams: 'attending',
      userEvents: [],
      userAttending: [],
      userGroups: [],
    };
  }

  componentDidMount() {
    Promise.all([
      axios.get(`/api/event/user/${this.props.uid}`).then(result => {
        this.setState({ userEvents: result.data });
      }),
      axios
        .get(`/api/event/getAttendingEventsData/${this.props.uid}`)
        .then(result => {
          this.setState({ userAttending: result.data });
        }),
      axios.get(`/api/group/user/${this.props.uid}`).then(result => {
        this.setState({ userGroups: result.data });
      }),
      axios.get(`/api/user/getUserInfo/${this.props.uid}`).then(result => {
        this.setState({
          userProfilePic: result.data[0].profile_image,
          userName: result.data[0].name,
          userLocation: result.data[0].location,
          userDescription: result.data[0].description,
          uid: this.props.uid,
        });
      }),
      axios.get(`/api/user/account/getPref/${this.props.uid}`).then(result =>
        this.setState({
          prefSettings: result.data.preference_settings,
        })
      ),
    ]).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.props.uid) {
      if (this.state.editable) {
        return <EditableProfile />;
      } else {
        return this.state.loading ? null : (
          <div>
            <img
              className="user-profile-pic"
              src={
                this.state.userProfilePic ||
                'https://firebasestorage.googleapis.com/v0/b/gatherv0-b3651.appspot.com/o/defaultPic.webp?alt=media&token=73d67fbf-6f0e-40aa-8fc9-15ec9e8e4fd9'
              }
              alt={this.state.userName}
            />
            <h1> {this.state.userName} </h1>
            <p className="user-description nunito-text">
              {this.state.userDescription}
            </p>
            <button
              className="edit-button"
              onClick={() => this.setState({ editable: true })}>
              Edit Profile
            </button>
            <div className="user-spec-buttons">
              {['attending', 'events', 'groups'].map((x, i) => {
                return (
                  <button
                    key={i}
                    className="user-spec-button-indiv btn-active nunito-text"
                    onClick={() => {
                      this.setState({ showParams: x });
                    }}>
                    {x.charAt(0).toUpperCase() + x.substr(1)}
                  </button>
                );
              })}
            </div>
            {this.state.showParams === 'attending' &&
            this.state.userAttending.length
              ? this.state.userAttending.map((event, i) => {
                  return (
                    <Link key={i} to={`/event/${event.id}`}>
                      <div className="card-container nunito-text">
                        <h5 className="event-card-date nunito-text">
                          {event.event_date}
                        </h5>
                        <h3>{event.title}</h3>
                        <p className="overflow">{event.description}</p>
                        <p className="event-card-loc">
                          {event.location.toUpperCase()}
                        </p>
                      </div>
                    </Link>
                  );
                })
              : null}
            {this.state.showParams === 'events' && this.state.userEvents.length
              ? this.state.userEvents.map((event, i) => {
                  return (
                    <Link key={i} to={`/event/${event.id}`}>
                      <div className="card-container nunito-text">
                        <h5 className="event-card-date nunito-text">
                          {event.event_date}
                        </h5>
                        <h3>{event.title}</h3>

                        <p className="overflow">{event.description}</p>
                        <p className="event-card-loc">
                          {event.location.toUpperCase()}
                        </p>
                      </div>
                    </Link>
                  );
                })
              : null}

            {this.state.showParams === 'groups' && this.state.userGroups.length
              ? this.state.userGroups.map((key, i) => {
                  return (
                    <div key={key.id} className="card-container">
                      <Link key={i} to={`/groups/${key.id}`}>
                        <h2 className="nunito-text">{key.name}</h2>
                        <h4 className="nunito-text">{key.location}</h4>
                        <h4 className="nunito-text">{key.website}</h4>
                      </Link>
                    </div>
                  );
                })
              : null}
            <div>
              <Link to="/user/account">
                <button
                  className="account-button  nunito-text"
                  onClick={() => this.setState({ accountSettings: true })}>
                  Edit Account
                </button>
              </Link>
            </div>
            <Footer />
          </div>
        );
      }
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = ({ AuthenticationReducer }) => {
  return { uid: AuthenticationReducer.uid };
};

export default connect(mapStateToProps)(Profile);
