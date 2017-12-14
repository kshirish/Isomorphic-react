import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, ButtonGroup, Alert, Badge, Form, FormGroup, Input, Label } from 'reactstrap';  

import { updateFormProperty, fetchFiltersApi } from '../actions';

class Main extends React.Component {

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.fetchFilters = this.fetchFilters.bind(this);
	}

	// componentWillMount() {
	// }

	componentDidMount() {
		
		const that = this;
		
		this.unlistenRoute = this.props.history.listen((location, action) => {
			
			if(location.pathname.indexOf('/filter/') === -1)
				return;

			const { pageId, searchTxt, type, year } = that.props;
			that.props.dispatch(fetchFiltersApi({ pageId, searchTxt, type, year }));
		});
	}

	// componentDidUpdate(prevProps) {			
	// }

	componentWillUnmount() {
		this.unlistenRoute();
	}

	handleChange(e, key) {
		this.props.dispatch(updateFormProperty({ key, value: e.target.value }));
	}

	fetchFilters(e, { pageId, searchTxt = '', type = '', year = '' }) {

		e.preventDefault();

		this.props.dispatch(updateFormProperty({ key: 'pageId', value: pageId }));
		setTimeout(() => this.props.history.push(`/filter/${pageId}?q=${searchTxt}&t=${type}&y=${year}`), 100);		
	}

	render() {
		
		const { Search = [], totalResults, Response, pageId, searchTxt, error, type = '', year = '' } = this.props;

		let content;

		if(Search.length) {

			content = Search.map(function(item, i) {

				return	<Row key={i} className="item pt-3 pb-3 mb-3">
					<Col sm="4">
						<img width="100%" src={item.Poster === 'N/A' ? '/images/not-available.png' : item.Poster} alt={item.Title} />
					</Col>
					<Col sm="8">
						<h4>{item.Title}</h4>
						<p><b>Year</b>: {' ' + item.Year + ' '}<Badge color="success">{item.Type}</Badge></p>					
						<Link to={'/detail/' + item.imdbID}><Button size="sm" color="danger">See More</Button></Link>
					</Col>
				</Row>	
			});
		
		} else {

			content = <Row>
				<Col sm="12">
					<Alert color="info">
						{error}
					</Alert>
				</Col>						
			</Row>			
		}

		return <main className="mt-5">
			<Row className="mb-3">
				<Col sm="12">
					<Row>
						<Col sm="12">
							<Form onSubmit={e => this.fetchFilters(e, { pageId: 1, searchTxt, type, year })}>
								<Row>
									<Col sm="4">
										<FormGroup>
										    <Label>Search</Label>
											<Input bsSize="lg" type="text" value={searchTxt} onChange={e => this.handleChange(e, 'searchTxt')} name="searchTxt" placeholder="Title" />
										</FormGroup>
									</Col>	
									<Col sm="4">	
										<FormGroup>
											<Label>Year</Label>
											<Input bsSize="lg" type="text" value={year} onChange={e => this.handleChange(e, 'year')} name="year" placeholder="Year" />
										</FormGroup>
									</Col>	
									<Col sm="4">	
										<FormGroup>
											<Label>Type</Label>
											<Input bsSize="lg" type="select" name="select" value={type} onChange={e => this.handleChange(e, 'type')}>
												<option value="" disabled>Choose:</option>
												<option value="movie">Movie</option>
												<option value="series">Series</option>
												<option value="episode">Episode</option>
											</Input>
										</FormGroup>
									</Col>
								</Row>	
								<Row>
									<Col sm="12">
										<Button color="primary" size="lg" block onClick={e => this.fetchFilters(e, { pageId: 1, searchTxt, type, year })}>Search</Button>
									</Col>
								</Row>		
							</Form>
						</Col>	
					</Row>	
				</Col>	
			</Row>	
			{ content }
			<Row className={classnames({ hide: !Search.length })}>
				<Col sm="12" className="text-center">
					<ButtonGroup>
						<Button className={classnames({ disabled: pageId === 1 })} onClick={e => this.fetchFilters(e, { pageId: pageId - 1, searchTxt, year, type })}>Older</Button>{' '}				
						<Button className={classnames({ disabled: Response === 'False' })} onClick={e => this.fetchFilters(e, { pageId: pageId + 1, searchTxt, year, type })}>Newer</Button>
					</ButtonGroup>
				</Col>	
			</Row>				
		</main>	
	}
}

const mapStateToProps = function(state) {
	
	const { Search, totalResults, Response, pageId, searchTxt, type, year, Error } = state.main;

	return {
		Search, 
		totalResults,
		Response,
		pageId: parseInt(pageId), 
		searchTxt,
		type,
		year,
		error: Error
	};
};

export default connect(
  mapStateToProps
)(Main);
