import React from 'react';

import { RecommendedEvents } from './recommendedEvents/recommendedEvents.js';
import { ExploreSearch } from './exploreSearch/exploreSearch';
import Footer from 'components/footer/footer';
import 'helpers.css';

const Explore = () => {
	return (
		<div className="explore-bottom-padding">
			<RecommendedEvents />
			<ExploreSearch />
			<Footer />
		</div>
	);
};

export default Explore;
