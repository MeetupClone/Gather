import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './createEvents.css';
import { createEvent } from 'ducks/event-redux';
import PlaceSearchForm from 'components/placeSearchForm/placeSearchForm';
import Category from 'components/categories/category';
import ConfirmBox from './confirmBox/confirmBox';

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
            created: false,
            confirmModal: false,
            file: '',
            imagePreviewUrl: '',
            cronTime: '',
        };
        this.updateParent = () => this.props.updateParent(this.state);
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

    render() {
        const { createEvent } = this.props;
        return (
            <div>
                {this.props.created ? (
                    <ConfirmBox
                        name={this.state.eventName}
                        date={`${this.state.eventDate} ${this.state.eventTime}`}
                        picture={this.state.imagePreviewUrl}
                        eventLocation={this.state.location}
                        description={this.state.description}
                        id={24}
                    />
                ) : (
                    <div>
                        <h1 className="create-title"> Create Event </h1>
                        <div className="form-container">
                            <input
                                required
                                type="text"
                                className="nunito-text"
                                placeholder="Name"
                                onChange={e =>
                                    this.handleChange(
                                        e.target.value,
                                        'eventName'
                                    )
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
                                    this.handleChange(
                                        e.target.value,
                                        'description'
                                    )
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
                                        eventDate: moment(event).format(
                                            'MM/DD/YYYY HH:mm'
                                        ),
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
                        </div>
                        <h2 className="category-title">Categories</h2>
                        <Category
                            className="category-button"
                            required
                            updateParent={state => {
                                this.setState({ categories: state });
                            }}
                        />
                        <img
                            className="event-picture"
                            src={
                                this.state.imagePreviewUrl ||
                                this.state.eventPic
                            }
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
                                Add an Event Photo
                            </label>
                        </form>

                        <button
                            disabled={true}
                            type="submit"
                            className="submit-event-button btn-active"
                            onClick={() => {
                                createEvent({
                                    ...this.state,
                                    uid: this.props.uid,
                                });
                            }}>
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ EventReducer, AuthenticationReducer }) => {
    return {
        created: EventReducer.created,
        loading: EventReducer.loading,
        uid: AuthenticationReducer.uid,
    };
};

export default connect(mapStateToProps, { createEvent })(CreateEvents);
