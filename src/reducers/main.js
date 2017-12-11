const initialState = {	
	pageId: 1,
	searchTxt: ''
};

const main = function (state = initialState, action) {

	switch (action.type) {

		case 'UPDATE_SEARCH_TXT': return { ...state, searchTxt: action.payload };

		case 'UPDATE_PAGE_ID': return { ...state, pageId: action.payload };

		case 'RESULTS_REQUESTING': return { ...state, fetching: true, isFetched: false };

		case 'RESULTS_RECEIVED': return { ...state, fetching: false, isFetched: true, ...action.payload };

		default: return state;
	}
}

export default main;