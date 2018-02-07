import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './singleEvent.css';

import { joinEvent, leaveEvent } from 'ducks/event-redux';

import { fire as firebase } from 'fire';

import Footer from 'components/footer/footer';

export class SingleEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: '',
      eventName: '',
      eventDate: '',
      eventLocation: '',
      eventDescription: '',
      eventPic: '',
      organizerUid: '',
      currentUserUid: '',
      userAttendingEvents: [],
      joined: false,
      eventMembers: 0,
      loading: true,
    };
  }

  componentWillMount() {
    let eventData = axios
      .get(`/api/event/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          eventId: response.data[0].event_id,
          eventName: response.data[0].title,
          eventLocation: response.data[0].location,
          eventDescription: response.data[0].description,
          eventPic: response.data[0].event_image,
          eventDate: response.data[0].event_date,
          organizerUid: response.data[0].organizer_uid,
          eventMembers: response.data[0].members,
        });
      });

    let auth = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return axios
          .get(`/api/event/getAttendingEventsData/${user.uid}`)
          .then(result => {
            this.setState({
              joined: result.data.filter(event => {
                console.log(event, this.state.eventId);
                return event.event_id === this.state.eventId;
              }).length,
            });
          });
      }
    });

    Promise.all([eventData, auth]).then(() => {
      this.setState({ loading: false });
    });
  }

  componentDidUpdate(newProps) {
    console.log(newProps.joined);
    if (newProps.joined) {
      this.setState({ joined: newProps.joined });
    }
  }

  render() {
    return this.state.loading ? null : (
      <div>
        <h1>{this.state.eventName}</h1>
        <div>
          <img
            className="event-picture"
            src={this.state.eventPic}
            alt={this.state.eventName}
          />
        </div>
        {this.state.currentUserUid === this.state.organizerUid ? (
          <div>
            <h1> This is your event! </h1>
            <Link to={`/event/edit/${this.props.match.params.id}`}>
              <button
                className="edit-event-button"
                onClick={() => {
                  this.setState({ edit: true });
                }}>
                Click here to edit your event.
              </button>
            </Link>
          </div>
        ) : this.state.joined ? (
          <button
            className="join-event-button"
            onClick={() => {
              this.props.joinEvent(this.state);
            }}>
            Join The Event
          </button>
        ) : null}

        <div className="event-info">
          <p>{this.state.eventDescription}</p>

          <p>{this.state.eventDate}</p>
          <h3>
            {this.state.eventMembers} Member{this.state.eventMembers !== '1' &&
              's'}
          </h3>

          <h3>{this.state.eventLocation}</h3>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ EventReducer }) => {
  return { joined: EventReducer.joined };
};

const actions = {
  joinEvent,
  leaveEvent,
};

export default connect(mapStateToProps, actions)(SingleEvent);
