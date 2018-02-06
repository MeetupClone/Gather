import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Routes } from 'routes';
import { fire as firebase } from 'fire';

import './navbar.css';
import 'helpers.css';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            checkedAuth: false,
        };
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ authenticated: true, checkedAuth: true });
            } else {
                this.setState({ checkedAuth: true });
            }
        });
    }

    render() {
        if (this.state.checkedAuth) {
            return (
                <div className="App">
                    <div className="nav-header nunito-text">
                        <Link to="/">
                            <img
                                className="nav-icon"
                                src={require('./assets/home.svg')}
                                alt="Home"
                            />
                        </Link>
                        <Link to="/explore">
                            <img
                                className="nav-icon"
                                src={require('./assets/explore.svg')}
                                alt="Explore"
                            />
                        </Link>
                        {this.state.authenticated ? (
                            <Link to="/user">
                                <img
                                    className="nav-icon"
                                    src={require('./assets/settings.svg')}
                                    alt="Settings"
                                />
                            </Link>
                        ) : (
                            <Link className="nav-text" to="/login">
                                Log In
                            </Link>
                        )}
                    </div>
                    <Routes uid={this.state.authenticated} />
                </div>
            );
        } else {
            return null;
        }
    }
}

export default withRouter(Navbar);
