const initialState = {	
};

const main = function (state = initialState, action) {

	switch (action.type) {

		case 'DETAILS_REQUESTING': return { ...state, fetching: true, isFetched: false };

		case 'DETAILS_RECEIVED': return { ...state, fetching: false, isFetched: true, ...action.payload };

		default: return state;
	}
}

export default main;