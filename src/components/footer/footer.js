import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            checkAuth: false,
            createButton: false,
            createButtonNonAuth: false,
        };
    }

    render() {
        let createButton = (
            <button
                className="footer-create-button"
                onClick={() => {
                    this.setState({ createButton: true });
                }}>
                Create
            </button>
        );
        let createEventButton = (
            <button
                className="inner-create-buttons"
                onClick={() => {
                    !this.props.uid
                        ? this.setState({ createButtonNonAuth: true })
                        : this.props.history.push('/event/create');
                }}>
                Event
            </button>
        );
        let createGroupButton = (
            <button
                className="inner-create-buttons"
                onClick={() => {
                    !this.props.uid
                        ? this.setState({ createButtonNonAuth: true })
                        : this.props.history.push('/groups/create');
                }}>
                Groups
            </button>
        );
        let loginButton = (
            <button
                className="footer-login-button"
                onClick={() => {
                    this.props.history.push('/login');
                    createButton = (
                        <button
                            className="footer-create-button"
                            onClick={() => {
                                this.setState({ createButton: true });
                            }}>
                            Create
                        </button>
                    );
                }}>
                Login
            </button>
        );
        if (this.state.createButton) {
            createButton = (
                <div className="row-flex">
                    {createEventButton}
                    {createGroupButton}
                </div>
            );
        }

        if (this.state.createButtonNonAuth) {
            createGroupButton = null;
            createEventButton = null;
            createButton = (
                <div>
                    <h3 className="login-text">
                        You must be logged in to create an event or group.
                    </h3>
                    {loginButton}
                </div>
            );
        }

        return this.props.loading ? null : (
            <div className="footer-all">
                <div className="create-button-space">{createButton}</div>
            </div>
        );
    }
}

const mapStateToProps = ({ AuthenticationReducer }) => {
    return {
        uid: AuthenticationReducer.uid,
        loading: AuthenticationReducer.loading,
    };
};

export default withRouter(connect(mapStateToProps, {})(Footer));
