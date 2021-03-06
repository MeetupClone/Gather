import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import 'App.css';
import 'helpers.css';
import { fire as firebase } from 'fire';
import { withRouter } from 'react-router-dom';
import { getAuthInfo } from 'ducks/authentication-redux';
import Navbar from 'components/navbar/navbar';
import { Routes } from 'routes';

class App extends Component {
    constructor() {
        super();
        this.state = {
            checkAuth: false,
            uid: '',
        };
    }

    componentDidMount() {
        localStorage.setItem('userData', '');

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                axios
                    .get(`/api/user/getUserInfo/${user.uid}`)
                    .then(result => {
                        this.props.getAuthInfo();

                        this.setState(
                            { uid: user.uid, checkAuth: true },
                            () => {
                                localStorage.setItem(
                                    'userData',
                                    JSON.stringify({
                                        uid: user.uid,
                                        userPic: result.data[0].profile_image,
                                        userLocation: result.data[0].location,
                                        userName: result.data[0].name,
                                        userDescription:
                                            result.data[0].description,
                                    })
                                );
                            }
                        );
                    })
                    .catch(() => {
                        this.setState({ checkAuth: false });
                    });
            } else {
                this.setState({ checkAuth: true });
            }
        });
    }

    render() {
        return this.state.checkAuth ? (
            <div className="App">
                <Navbar uid={this.state.uid} />
                <Routes uid={this.state.uid} />
            </div>
        ) : null;
    }
}

const mapStateToProps = ({ AuthenticationReducer }) => {
    return { uid: AuthenticationReducer.uid };
};

export default withRouter(connect(mapStateToProps, { getAuthInfo })(App));
