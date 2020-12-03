import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row } from 'react-bootstrap';
import Navbar from './Navbar';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';

const useStyles = (theme) => ({
	root: {
		flexGrow: 1,
		margin: '25px'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		backgroundColor: 'lightgray'
	},
	texts: {
		margin: 'auto',
		width: '80%',
		border: '3px solid blue',
		padding: '30px'
	},
	button: {
		height: '50px',
		margin: '20px'
	},
	input: {
		height: '50px',
		width: '500px'
	},
	result: {
		backgroundColor: 'whitesmoke',
		margin: '20px',
		padding: '10px',
		textAlign: 'left'
	}
});

class Search extends Component {
	constructor() {
		super();

		this.state = {
			books: [],
			searchbook: ''
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.changeSearch = this.changeSearch.bind(this);
	}

	async onSubmit(event) {
		event.preventDefault();

		const url =
			'https://www.googleapis.com/books/v1/volumes?q=' +
			`${this.state.searchbook}` +
			'&key=AIzaSyAAYnKlqQuHcxXo8uVa9luGSfd7yTbmjik';
		const response = await fetch(url);
		const data = await response.json();

		this.setState({ books: data.items });
	}

	onAdd(event) {
		event.preventDefault();

		const text = event.target.textContent;
		const index = text.split(' ');

		console.log(this.state.books[index[0]]);

		const book = {
			id: this.state.books[index[0]].id,
			title: this.state.books[index[0]].volumeInfo.title,
			author: this.state.books[index[0]].volumeInfo.authors[0],
			description: this.state.books[index[0]].volumeInfo.description,
			picture: this.state.books[index[0]].volumeInfo.imageLinks.thumbnail,
			link: this.state.books[index[0]].volumeInfo.infoLink
		};

		axios
			.post('http://localhost:4000/app/book', book)
			.then((response) => console.log('Book Saved: ', response.data));

		event.target.textContent = 'added';
	}

	changeSearch(event) {
		this.setState({
			searchbook: event.target.value
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Navbar />
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<h2>Search a Book </h2>
							<Container className={classes.texts}>
								<Row>
									<TextField
										id="search"
										label="Search"
										className={classes.input}
										onChange={this.changeSearch}
										value={this.state.searchbook}
									/>
									<Button
										variant="contained"
										color="primary"
										className={classes.button}
										onClick={this.onSubmit}
									>
										submit
									</Button>
								</Row>

								<MDBTable>
									<MDBTableHead color="primary-color" textWhite>
										<tr>
											<th>
												<h3>Results</h3>
											</th>
										</tr>
									</MDBTableHead>
									{this.state.books.map((book, index) => (
										<Container className={classes.result} key={book.id}>
											<MDBTableBody>
												<tr>
													<td>
														<Button
															variant="contained"
															color="secondary"
															onClick={this.onAdd}
															id={index}
														>
															{index} Add+
														</Button>
													</td>
												</tr>
												<tr>
													<td>
														<h4>Title:</h4> {book.volumeInfo.title}
													</td>
												</tr>
												<td>
													<h4>Author:</h4> {book.volumeInfo.authors[0]}
												</td>
												<tr />
												<tr>
													<td>
														<h4>Description:</h4> {book.volumeInfo.description}
													</td>
												</tr>
												<tr>
													<td>
														<h4>Image: </h4>

														<img src={book.volumeInfo.imageLinks.thumbnail} />
													</td>
												</tr>
												<tr>
													<td>
														<h4>Link:</h4>{' '}
														<a href={book.volumeInfo.infoLink}>
															{book.volumeInfo.infoLink}{' '}
														</a>
													</td>
												</tr>
											</MDBTableBody>
										</Container>
									))}
								</MDBTable>

								<Row />
							</Container>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(useStyles)(Search);
