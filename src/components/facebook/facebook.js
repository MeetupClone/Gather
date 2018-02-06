import React, { Component } from 'react';

import './facebook.css';

export default class Facebook extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    // change href w site/event url
    render() {
        return (
            <div
                data-href="https://developers.facebook.com/docs/plugins/"
                data-layout="button"
                data-size="large"
                data-mobile-iframe="true">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://gather.petermiles.io">
                    <img
                        alt="facebook logo"
                        className="facebook-styling"
                        src={require('./share-facebook.png')}
                    />
                </a>
            </div>
        );
    }
}
