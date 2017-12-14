import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Jumbotron, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Progress } from 'reactstrap';  

import { fetchDetailsApi } from '../actions';

class Detail extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.dispatch(fetchDetailsApi(this.props.match.params.id));
	}

	render() {
		
		if(!this.props.isFetched)
			return null;

		const { Title, Poster, Plot, Director, Genre, Actors, Awards, Ratings } = this.props;

		const imdb = Number(Ratings[0].Value.replace('/10', ''))*10;
		const rotten = parseInt(Ratings[1].Value.replace('%', ''));
		const meta = parseInt(Ratings[2].Value.replace('/100', ''));

		return <main className="mt-4">
			<Row>
				<Col sm="12">
					<Jumbotron>
						<h1 className="display-3 mb-4">{Title}</h1>
						<p className="lead">{Plot}</p>
					</Jumbotron>
				</Col>	
				<Col sm="4">
					<img width="100%" src={Poster === 'N/A' ? '/images/not-available.png' : Poster} alt={Title} />
				</Col>
				<Col sm="8">
					<ListGroup className="mb-2">
						<ListGroupItem color="warning">Awards</ListGroupItem>
						<ListGroupItem>{Awards}</ListGroupItem>
					</ListGroup>

					<ListGroup className="mb-2">
						<ListGroupItem color="warning">Director</ListGroupItem>
						<ListGroupItem>{Director}</ListGroupItem>
					</ListGroup>

					<ListGroup className="mb-2">
						<ListGroupItem color="warning">Cast</ListGroupItem>
						<ListGroupItem>{Actors}</ListGroupItem>
					</ListGroup>

					<ListGroup className="mb-2">
						<ListGroupItem color="warning">Genre</ListGroupItem>
						<ListGroupItem>{Genre}</ListGroupItem>
					</ListGroup>
				</Col>	
				<Col sm="12" className="mt-4">
					<div>IMDB - {imdb + '%'}</div>
					<Progress className="mb-3" color="warning" value={imdb}/>
					<div>Rotten Tomatoes - {rotten + '%'}</div>
					<Progress className="mb-3" color="success" value={rotten}/>
					<div>Metacritic - {meta + '%'}</div>
					<Progress className="mb-3" color="info" value={meta}/>
				</Col>
			</Row>	
		</main>	
	}
}

const mapStateToProps = function(state) {	
	
	return { ...state.detail };
};

export default connect(
  mapStateToProps
)(Detail);
