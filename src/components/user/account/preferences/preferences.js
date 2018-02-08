import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Category from 'components/categories/category';

class Preferences extends Component {
	constructor(props) {
		super(props);

		this.state = {
			preferences: '',
			userCat: [],
			categories: [],
		};

		this.updateParent = () => this.props.updateParent(this.state);
		this.changePreferences = this.changePreferences.bind(this);
	}

	componentWillMount() {
		axios.get(`/api/user/account/getPref/${this.props.uid}`).then(result => {
			this.setState({
				preferences: result.data[0].preference_settings,
			});
		});

		axios
			.get(`/api/user/account/getCat/${localStorage.getItem('uid')}`)
			.then(result => {
				this.setState({ categories: result.data });
			});
	}

	changePreferences() {
		axios
			.post('/api/user/updateprefs', [!this.state.preferences, this.props.uid])
			.then(() => this.setState({ preferences: !this.state.preferences }));
	}

	render() {
		let preferenceText = null;
		let preferenceButton = null;
		if (this.state.preferences) {
			preferenceText = (
				<p>You are currently sharing information on your profile.</p>
			);
			preferenceButton = (
				<button
					onClick={() => {
						this.changePreferences();
					}}>
					Turn On Privacy Mode
				</button>
			);
		} else {
			preferenceText = (
				<div>
					<p>You currently have no information displayed on your profile.</p>
				</div>
			);
			preferenceButton = (
				<button
					onClick={() => {
						this.changePreferences();
					}}>
					Turn Off Privacy Mode
				</button>
			);
		}

		return (
			<div>
				<h1>Manage Preferences</h1>
				<h4>Privacy Settings</h4>
				<div>
					{preferenceText}
					{preferenceButton}
				</div>
				<h4>Categories You Like</h4>
				<Category
					categories={this.state.categories}
					required
					updateParent={state => {
						this.setState({ categories: state });
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = ({ AuthenticationReducer }) => {
	return { uid: AuthenticationReducer.uid };
};

export default connect(mapStateToProps, {})(Preferences);
