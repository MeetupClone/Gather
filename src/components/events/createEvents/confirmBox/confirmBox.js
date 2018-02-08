import React from 'react';
import Facebook from 'components/facebook/facebook';
import Twitter from 'components/twitter/twitter';
import Email from 'components/email/email';
import { withRouter, Link } from 'react-router-dom';

import './confirmBox.css';

const ConfirmBox = props => {
	return (
		<div className="box-container">
			<h2 className="confirm-box-congrats">
				{"Congratulations, you've made an event!"}
			</h2>

			<Link to={`/event/${props.id}`}>
				{props.picture && (
					<img
						className="confirm-box-img"
						src={props.picture}
						alt={props.name}
					/>
				)}
			</Link>
			<h2 className="confirm-box-name">{props.name}</h2>
			<div className="box-wrapper">
				<h4 className="confirm-box-desc"> {props.description} </h4>
			</div>
			<div className="box-wrapper">
				<h5 className="confirm-box-date"> {props.date} </h5>
				<h5 className="confirm-box-location"> {props.eventLocation} </h5>
			</div>

			<div className="box-wrapper">
				<h3>Share your event!</h3>
				<div className="share-icons">
					<Twitter />
					<Facebook />
					<Email />
				</div>
			</div>
		</div>
	);
};

export default withRouter(ConfirmBox);
