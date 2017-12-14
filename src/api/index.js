import request from 'superagent';

const fetchFilters = function({ pageId = '', searchTxt = '', type = '', year = '' }) {
	return request.get(`https://www.omdbapi.com/?apikey=6cf73d72&type=${type}&s=${searchTxt}&page=${pageId}&y=${year}`);		
};

const fetchDetails = function(id = '') {
	return request.get(`https://www.omdbapi.com/?apikey=6cf73d72&i=${id}`);		
};

export default { fetchFilters, fetchDetails };