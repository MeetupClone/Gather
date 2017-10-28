import React, { Component } from "react";

import Register from "./register/register"
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

				<h1> Log In Page </h1>

				{this.props.authenticated
					? <h3> Log Out </h3>
					: <div>
						<Link to ="/register">
						Register 
						</Link>

					</div>
				}
			</div>
        )
    }
}