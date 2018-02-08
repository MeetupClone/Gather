import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getAuthInfo } from '../../../../ducks/authentication-redux';

import axios from 'axios';

export class Notifications extends Component {
	constructor(props) {
		super(props);

		this.state = {
			notifications: '',
		};

		this.changeNotificationPreferences = this.changeNotificationPreferences.bind(
			this
		);
	}

	componentDidMount() {
		axios.get(`/api/user/account/getPref/${this.props.uid}`).then(result => {
			this.setState({
				notifications: result.data[0].notification_settings,
			});
		});
	}

	changeNotificationPreferences() {
		axios
			.post('/api/user/updatenotifs/', [
				!this.state.notifications,
				this.props.uid,
			])
			.then(this.setState({ notifications: !this.state.notifications }));
	}

	render() {
		return (
			<div>
				<h1>Manage Notification Page</h1>

				{this.state.notifications ? (
					<span>
						<h3>You currently have notifications turned on.</h3>
						<button
							onClick={() => {
								this.changeNotificationPreferences();
							}}>
							Turn Off Notifications
						</button>
					</span>
				) : (
					<span>
						<h3>You currently have notifications turned off.</h3>
						<h4>Turn on notifications to recieve reminders about events!</h4>
						<button
							onClick={() => {
								this.changeNotificationPreferences();
							}}>
							Turn On Notifications
						</button>
					</span>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

const actions = {
	getAuthInfo,
};

export default connect(mapStateToProps, actions)(Notifications);
