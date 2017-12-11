import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import reducers from '../reducers';

const configureStore = (preloadedState) => {  
	return createStore(reducers, preloadedState, applyMiddleware(thunk, createLogger()));
}

export default configureStore