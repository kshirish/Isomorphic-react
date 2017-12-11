import React from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends React.Component {

	componentWillMount() {
		
		const { staticContext } = this.props;

		if (staticContext)
			staticContext.is404 = true;
	}

	render() {
		return <main>
			<h1>404</h1>
			<h2>Page not found!</h2>
			<p><Link to="/">Go back to the main page</Link></p>
		<main>
	}
}

export default NotFoundPage;
