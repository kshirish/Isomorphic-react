import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import configureStore from './store/configure-store'

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

ReactDOM.render(<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
, document.getElementById('root'));