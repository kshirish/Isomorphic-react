import Express from 'express'
import path from 'path';
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter as Router } from 'react-router-dom';

import App from './components/App'
import Api from './api'
import configureStore from './store/configure-store'

const app = new Express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));

app.use(function(req, res, next) {

	if(req.path === '/') {

		const config = {
			pageId: '', 
			searchTxt: '',
			type: '',
			year: ''	
		};

		Api.fetchFilters(config).then(function(result) {

			req.state = { main: { ...result.body, ...config }};
			next();
		});
	
	} else if(req.path.indexOf('/filter/') !== -1) {

		const config = {
			pageId: req.path.replace('/filter/', ''), 
			searchTxt: req.query.q,
			type: req.query.t,
			year: req.query.y
		};

		Api.fetchFilters(config).then(function(result) {

			req.state = { main: { ...result.body, ...config }};
			next();
		})

	} else if(req.path.indexOf('/detail/') !== -1) {

		const id = req.path.replace('/detail/', '');

		Api.fetchDetails(id).then(function(result) {

			req.state = { detail: { ...result.body }};
			next();
		})

	} else if(req.path === '/about' ) {

		next();

	} else {

		return res.redirect('/');
	}

});

app.get('*', (req, res) => {

	const store = configureStore(req.state || {});
	const context = {};

	const html = renderToString(<Provider store={store}>      
		<Router location={req.url} context={context}>
			<App />
		</Router>
	</Provider>);

	let status = 200;

	// context.url will contain the URL to redirect to if a <Redirect> was used
	if(context.url)
		return res.redirect(302, context.url);

	// set in NotFoundPage component
	if (context.is404)
		status = 404;
	
	const finalState = store.getState();

	return res.status(status).render('index', { html, finalState });
});

app.listen(port, (err) => { 
	console.info(`Server running on ${port} [${env}]`);
});