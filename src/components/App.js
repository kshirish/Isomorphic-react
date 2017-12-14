import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

import Main from './Main';
import Detail from './Detail';
import About from './About';

const App = () => (
	<Container>
		<Row>
			<Col sm="12" md={{ size: 8, offset: 2 }}>
				<h1 className="text-center">- OMBD -</h1>
				<div className="text-center">
					<Link to="/"><Button color="link">Home</Button></Link>
					<Link to="/about"><Button color="link">About</Button></Link>
				</div>	
				<Switch>  
					<Route exact path="/" component={Main} />
					<Route path="/filter/:id" component={Main} />
					<Route path="/detail/:id" component={Detail} />
					<Route path="/about" component={About} />
                    <Redirect from='*' to='/' />
				</Switch>   
			</Col>
		</Row>	
	</Container>
);

export default App;