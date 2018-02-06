import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fire as firebase } from '../../../fire';
import './createEvents.css';
import { createEvent } from '../../../ducks/event-redux';
import PlaceSearchForm from '../../placeSearchForm/placeSearchForm';
import Category from '../../categories/category';

import './createEvents.css';

import Datetime from 'react-datetime';
import moment from 'moment';

import Facebook from '../../facebook/facebook';
import Twitter from '../../twitter/twitter';
import Email from '../../email/email';

export class CreateEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventPic: '',
            eventName: '',
            uid: '',
            description: '',
            eventDate: '',
            eventTime: '',
            location: '',
            placeId: '',
            categories: '',
            created: this.props.EventReducer.created,
            website: '',
            confirmModal: false,
            file: '',
            imagePreviewUrl: '',
            cronTime: '',
        };
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uid: user.uid,
                });
            }
        });
        this.updateParent = state => this.props.updateParent(this.state);
        this.imageProcess = this.imageProcess.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val, prop) {
        this.setState({
            [prop]: val,
        });
    }

    imageProcess(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
        };
        reader.readAsDataURL(file);
    }

    componentWillReceiveProps(newProps) {
        this.setState({ created: newProps.EventReducer.created });
    }

    render() {
        const { createEvent } = this.props;
        return (
            <div>
                {this.state.created && (
                    <div>
                        <h1> Congratulations, you've made an event!</h1>
                        <h3>Share your event!</h3>
                        <div className="flex-row">
                            <Twitter />
                            <Facebook />
                            <Email />
                        </div>
                    </div>
                )}
                <h1 className="createTitle"> Create Event </h1>
                <input
                    required
                    type="text"
                    className="nunito-text"
                    placeholder="Name"
                    onChange={e =>
                        this.handleChange(e.target.value, 'eventName')
                    }
                    ref={input => {
                        this.eventName = input;
                    }}
                />
                <input
                    required
                    type="text"
                    className="nunito-text"
                    placeholder="Description"
                    onChange={e =>
                        this.handleChange(e.target.value, 'description')
                    }
                />
                <PlaceSearchForm
                    placeholder="Address"
                    updateParent={location => {
                        this.setState({
                            location: location.address,
                            placeId: location.placeId,
                        });
                    }}
                />
                <input
                    className="event-datetime"
                    required
                    type="date"
                    min={moment().format('YYYY-MM-DD')}
                    onChange={event => {
                        this.setState({
                            eventDate: moment(event).format('MM/DD/YYYY HH:mm'),
                        });
                    }}
                />

                <input
                    step="900"
                    className="event-datetime nunito-text"
                    required
                    type="time"
                    onChange={event => {
                        this.setState({
                            eventTime: event.target.value,
                            cronTime: moment
                                .utc(event)
                                .subtract(3, 'hours')
                                .format(),
                        });
                    }}
                />

                <div className="category-title">
                    {' '}
                    Categories
                    <Category
                        className="category-button"
                        required
                        updateParent={state => {
                            this.setState({ categories: state });
                        }}
                    />
                </div>
                <img
                    className="event-picture"
                    src={this.state.imagePreviewUrl || this.state.eventPic}
                    alt=""
                />
                <form>
                    <input
                        id="input"
                        className="input-picture btn-active"
                        type="file"
                        onChange={event => this.imageProcess(event)}
                    />
                    <label className="input-label" htmlFor="input">
                        {' '}
                        Add an Event Photo{' '}
                    </label>
                </form>

                <button
                    type="submit"
                    className="submit-event-button btn-active"
                    onClick={event => {
                        event.preventDefault();
                        createEvent(this.state);
                    }}>
                    Submit
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

const actions = {
    createEvent,
};

export default connect(mapStateToProps, actions)(CreateEvents);
