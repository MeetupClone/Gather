import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './authHome.css';
import 'helpers.css';
import 'components/events/explore/exploreSearch/eventCards/eventCards2.css';
import Footer from 'components/footer/footer';
import EventsYouMayLike from './eventsYouMayLike/eventsYouMayLike';

class AuthHome extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userEvents: [],
			recEvents: [],
			loading: true,
		};
	}

	componentWillMount() {
		axios
			.get(`/api/event/getAttendingEventsData/${this.props.uid}`)
			.then(result =>
				this.setState({
					loading: false,
					userEvents: result.data,
				})
			);
	}

	render() {
		return this.state.loading ? (
			Array.apply(null, { length: 5 }).map((x, i) => {
				return <div key={i} className="home-page-loading-container" />;
			})
		) : (
			<div>
				<h3 className="nunito-text">Upcoming Events</h3>
				{this.state.userEvents.map((event, i) => {
					return (
						<Link key={i} to={`/event/${event.id}`}>
							<div event={event.id} className="card-container nunito-text">
								<div>{event.title}</div>
								<div className="event-card-date nunito-text">
									{event.event_date}
								</div>
								<p className="event-card-desc">{event.description}</p>
								<p className="event-card-loc">{event.location.toUpperCase()}</p>
							</div>
						</Link>
					);
				})}
				<div className="recc-events-container">
					<EventsYouMayLike uid={this.props.uid} />
				</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = ({ AuthenticationReducer }) => {
	return {
		uid: AuthenticationReducer.uid,
	};
};

export default connect(mapStateToProps, {})(AuthHome);
