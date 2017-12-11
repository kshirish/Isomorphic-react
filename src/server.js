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

app.get('*', function(req, res) {

	const pageId = req.path.replace('/page/', '');
	const searchTxt = req.query.q.replace('q=', '');

	Api.fetchResults(pageId, searchTxt)  
		.then(function(result) {

			const preloadedState = result.body;
			const store = configureStore({ main: { ...preloadedState, ...{ pageId, searchTxt }}});
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
		})
		.catch(function(err) {
			console.error(err);
		})
});


app.listen(port, (err) => { 
	console.info(`Server running on ${port} [${env}]`);
});