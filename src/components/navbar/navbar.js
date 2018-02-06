import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './navbar.css';
import 'helpers.css';

const Navbar = props => {
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
                {props.uid ? (
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
        </div>
    );
};

export default withRouter(Navbar);
