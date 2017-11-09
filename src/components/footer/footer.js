
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { fire as firebase } from "../../fire";

import "./footer.css";

export default class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: false,
        }



    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: true,
                })
            }
        })
    }


    render() {
        if (this.state.user) {
            return (
                <div className="footer-all">
        <Link to="/event/create">
      <button className="footer-create-button">Create</button>
        </Link>
      <div className="footer-background">
      <h5 className="footer-links"><Link to="/" className="footer-home">Home </Link><Link to="/faq" className="footer-home"> About </Link><Link to="/user/account" className="footer-home"> Settings</Link></h5>
    </div>
    </div>
            )
        } else {
            return (
                <div className="footer-all">
        <Link to="/login">
      <button className="footer-create-button">Create</button>
        </Link>
      <div className="footer-background">
      <h5 className="footer-links"><Link to="/" className="footer-home">Home</Link><Link to="/faq" className="footer-home"> About</Link><Link to="/user/account" className="footer-home">Settings</Link></h5>
    </div>
    </div>
            )
        }

    }
}