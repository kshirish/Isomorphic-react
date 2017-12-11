import request from 'superagent';

const fetchResults = function(pageId = 1, searchTxt = '') {
	return request.get(`https://www.omdbapi.com/?apikey=6cf73d72&type=movie&s=${searchTxt}&page=${pageId}`);		
};

export default { fetchResults };