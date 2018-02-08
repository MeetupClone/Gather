import React from 'react';

import PlacesAutocomplete, {
	geocodeByAddress,
} from 'react-places-autocomplete';

import './placeSearchForm.css';

class PlaceSearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			placeId: '',
		};
		this.onChange = address => this.setState({ address });
		this.updateParent = state => this.props.updateParent(state);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit(event) {
		event.preventDefault();
		geocodeByAddress(this.state.address).then(results => {
			this.setState({
				address: results[0].formatted_address,
				placeId: results[0].place_id,
			});
			this.updateParent(this.state);
		});
	}

	render() {
		return (
			<form>
				<PlacesAutocomplete
					googleLogo={false}
					inputProps={{
						value: this.state.address,
						onChange: this.onChange,
						onBlur: this.handleFormSubmit,
						placeholder: 'Pick a Location',
					}}
					autocompleteItem={({ formattedSuggestion }) => (
						<div>
							<strong>{formattedSuggestion.mainText}</strong>
							<small>{formattedSuggestion.secondaryText}</small>
						</div>
					)}
					classNames={{
						root: 'root',
						input: 'form-control',
						autocompleteContainer: 'auto-complete-container',
					}}
				/>
			</form>
		);
	}
}

export default PlaceSearchForm;
