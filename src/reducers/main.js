const initialState = {	
	pageId: 1,
	searchTxt: ''
};

const main = function (state = initialState, action) {

	switch (action.type) {

		case 'UPDATE_FORM_PROPERTY': return { ...state, ...{ [action.payload.key]: action.payload.value } };

		case 'FILTERS_REQUESTING': return { ...state, fetching: true, isFetched: false };

		case 'FILTERS_RECEIVED': return { ...state, fetching: false, isFetched: true, ...action.payload };

		default: return state;
	}
}

export default main;