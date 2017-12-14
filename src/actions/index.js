import Api from '../api';

export const updateFormProperty = function(payload) {
	return {
		type: 'UPDATE_FORM_PROPERTY',
		payload
	};
}

export const fetchFiltersApi = function(config) {

	return function(dispatch) {

		dispatch({ type: 'FILTERS_REQUESTING' });

		Api.fetchFilters(config)
			.then(function(res) {

				dispatch({ type: 'FILTERS_RECEIVED', payload: res.body });
			});
	};
}

export const fetchDetailsApi = function(config) {

	return function(dispatch) {

		dispatch({ type: 'DETAILS_REQUESTING' });

		Api.fetchDetails(config)
			.then(function(res) {

				dispatch({ type: 'DETAILS_RECEIVED', payload: res.body });
			});
	};
}
