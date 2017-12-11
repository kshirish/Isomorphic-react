import Api from '../api';

export const updateSearchTxt = function(searchTxt) {
	return {
		type: 'UPDATE_SEARCH_TXT',
		payload: searchTxt
	}
}

export const updatePageId = function(pageId) {
	return {
		type: 'UPDATE_PAGE_ID',
		payload: pageId
	}
}

export const fetchResultsApi = function(pageId, searchTxt) {

  return function(dispatch) {
    
    dispatch({ type: 'RESULTS_REQUESTING' });
    
    Api.fetchResults(pageId, searchTxt)
      .then(function(res) {
        
        dispatch({ type: 'RESULTS_RECEIVED', payload: res.body });
      });
  };  
}
