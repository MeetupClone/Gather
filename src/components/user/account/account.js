import React, { Component } from 'react';

import './account.css';

import '../../../helpers.css';

import { connect } from 'react-redux';
import { getAuthInfo } from '../../../ducks/authentication-redux';

import { Notifications } from './notifications/notifications';
import { Preferences } from './preferences/preferences';
import { fire as firebase } from '../../../fire';

export class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: this.props.uid,
            accountState: 1,
            email: '',
            notifications: true,
            preferences: [],
            userCat: [],
        };

        this.changeView = this.changeView.bind(this);
    }

    changeView(val) {
        this.setState({ accountState: val });
    }

    render() {
        //fiddle with this!

        let displayMe = null;

        switch (this.state.accountState) {
            case 1:
                displayMe = <Notifications uid={this.state.uid} />;
                break;

            case 2:
                displayMe = <Preferences uid={this.state.uid} />;
                break;
            default:
                break;
        }
        return (
            <div className="account-main-container nunito-text">
                <div className="account-left-options">
                    <div onClick={() => this.changeView(1)}>Notifications</div>
                    <div onClick={() => this.changeView(2)}>Preferences</div>
                    <div
                        onClick={() => {
                            firebase
                                .auth()
                                .signOut()
                                .then(() => {
                                    this.props.history.push('/');
                                });
                        }}>
                        Link to Logout
                    </div>
                </div>
                <div className="account-right-content">{displayMe}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.AuthenticationReducer;
};

const actions = {
    getAuthInfo,
};

export default connect(mapStateToProps, actions)(Account);
