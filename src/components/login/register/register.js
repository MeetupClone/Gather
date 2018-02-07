import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    authWithEmailPassword,
    authWithFacebook,
} from '../../../ducks/authentication-redux';

import '../login.css';
import Category from '../../categories/category';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            authenticated: false,
            categoriesAdded: false,
            categories: [],
        };

        this.updateParent = () => this.props.updateParent(this.state);
    }

    render() {
        const { authWithEmailPassword, authWithFacebook } = this.props;

        return (
            <div id="register-page">
                <h1 id="register-title"> Register </h1>

                <input
                    name="name"
                    type="name"
                    onChange={event =>
                        this.setState({ name: event.target.value })
                    }
                    placeholder="Name"
                />
                <input
                    name="email"
                    type="email"
                    onChange={event =>
                        this.setState({ email: event.target.value })
                    }
                    placeholder="Email"
                />
                <input
                    name="password"
                    type="password"
                    onChange={event =>
                        this.setState({ password: event.target.value })
                    }
                    placeholder="Password"
                />
                <Category
                    className="categorySelector"
                    updateParent={state => {
                        this.setState({
                            categoriesAdded: true,
                            categories: state,
                        });
                    }}
                />

                {this.state.categories.length ? (
                    <div>
                        <button
                            className="login-button box-shadow"
                            onClick={event => {
                                event.preventDefault();
                                authWithEmailPassword(this.state);
                            }}>
                            Create Account
                        </button>
                        <div id="providers-auth" className="center">
                            <button
                                className="auth-button facebook box-shadow"
                                onClick={event => {
                                    event.preventDefault();
                                    authWithFacebook(
                                        this.state.categories
                                    ).then(this.props.history.push('/explore'));
                                }}>
                                <img
                                    className="auth-icon"
                                    src={require('../assets/facebook.svg')}
                                    alt="facebook"
                                />
                                Sign Up With Facebook
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1> Choose some categories! </h1>
                        <h3>
                            These allow us to provide you with events that you
                            may like
                        </h3>
                        <h6>
                            You can change these any time in your account
                            settings
                        </h6>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    ({ AuthenticationReducer }) => {
        return AuthenticationReducer;
    },
    {
        authWithEmailPassword,
        authWithFacebook,
    }
)(Register);
