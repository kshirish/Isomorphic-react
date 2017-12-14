import React from 'react';

import { Container, Row, Col } from 'reactstrap';  

const About = () => (
	<main className="mt-5">
		<p>The most common use case for server-side rendering is to handle the initial render when a user (or search engine crawler) first requests our app. When the server receives the request, it renders the required component(s) into an HTML string, and then sends it as a response to the client. From that point on, the client takes over rendering duties.</p>
		<p>We will use React in the examples below, but the same techniques can be used with other view frameworks that can render on the server.</p>
	</main>		
);

export default About;
