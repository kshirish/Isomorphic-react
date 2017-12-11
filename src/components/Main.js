import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, ButtonGroup, Alert, Badge, Form, FormGroup, Input } from 'reactstrap';  

import { updatePageId, updateSearchTxt, fetchResultsApi } from '../actions';

class Main extends React.Component {

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.fetchResults = this.fetchResults.bind(this);
	}

	componentWillMount() {
	}

	componentDidMount() {
		
		const that = this;
		
		this.unlistenRoute = this.props.history.listen((location, action) => {
			that.props.dispatch(fetchResultsApi(that.props.pageId, that.props.searchTxt));
		});
	}

	componentDidUpdate(prevProps) {			
	}

	componentWillUnmount() {
		this.unlistenRoute();
	}

	handleChange(e) {
		this.props.dispatch(updateSearchTxt(e.target.value));
	}

	fetchResults(e, pageId, searchTxt) {

		e.preventDefault();

		this.props.dispatch(updatePageId(pageId));		
		setTimeout(() => this.props.history.push(`/page/${pageId}?q=${searchTxt}`), 100);		
	}

	render() {
		
		const { Search = [], totalResults, Response, pageId, searchTxt, error } = this.props;

		const itemsEl = Search.map(function(item, i) {

			return	<Row key={i} className="item pt-3 pb-3 mb-3">
				<Col sm="4">
					<img width="100%" src={item.Poster === 'N/A' ? '/images/not-available.png' : item.Poster} alt={item.Title} />
				</Col>
				<Col sm="8">
					<h4>{item.Title}</h4>
					<p><b>Year</b>: {' ' + item.Year + ' '}<Badge color="danger">{item.Type}</Badge></p>					
				</Col>
			</Row>	
		});

		return <main>
			<Row className="mb-3">
				<Col sm="12">
					<Alert color="danger" className={classnames({ hide: !error })}>
						{error}
					</Alert>
					<Form onSubmit={e => this.fetchResults(e, 1, searchTxt)}>
						<FormGroup>
							<Input bsSize="lg" type="text" value={searchTxt} onChange={e => this.handleChange(e)} name="searchTxt" placeholder="Enter title here" />
						</FormGroup>
					</Form>
				</Col>	
			</Row>	
			{itemsEl}
			<Row className="text-center">
				<Col sm="12">			
					<ButtonGroup>
						<Button className={classnames({ disabled: pageId === 1 })} onClick={e => this.fetchResults(e, pageId - 1, searchTxt)}>Older</Button>{' '}				
						<Button className={classnames({ disabled: Response === 'False' })} onClick={e => this.fetchResults(e, pageId + 1, searchTxt)}>Newer</Button>
					</ButtonGroup>
				</Col>	
			</Row>	
		</main>	
	}
}

const mapStateToProps = function(state) {
	
	return {
		Search: state.main.Search, 
		totalResults: state.main.totalResults,
		Response: state.main.Response,
		pageId: parseInt(state.main.pageId), 
		searchTxt: state.main.searchTxt,
		error: state.main.Error
	};
};

export default connect(
  mapStateToProps
)(Main);
