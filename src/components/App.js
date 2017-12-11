import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Main from './Main';
import About from './About';

const App = () => (
	<Container>
		<Row>
			<Col sm="12" md={{ size: 8, offset: 2 }}>
				<h1 className="text-center">- Isomorphic React -</h1>
				<Link to="/about"><p className="text-center">About us</p></Link>
				<Switch>  
					<Route path="/page/:id" component={Main} />
					<Route path="/about" component={About} />
                    <Redirect from='*' to='/page/1?q=wild' />
				</Switch>   
			</Col>
		</Row>	
	</Container>
);

export default App;