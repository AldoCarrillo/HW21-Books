import React, { Component } from 'react';
import Navbar from './Navbar';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Container, Row } from 'react-bootstrap';
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

class Saved extends Component {
	constructor() {
		super();

		this.state = {
			books: []
		};

		this.onDelete = this.onDelete.bind(this);
	}

	componentDidMount() {
		axios.get('/app/books').then((response) => {
			this.setState({
				books: response.data
			});
		});

		var loadScript = function(src) {
			var tag = document.createElement('script');
			tag.async = false;
			tag.src = src;
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(tag);
		};
		loadScript('/Saved');
	}

	onDelete(event) {
		event.preventDefault();

		const text = event.target.textContent;
		const index = text.split(' ');

		axios.delete('/app/bookid', { params: { id: this.state.books[index[0]].id } }).then((response) => {
			console.log(response.data);
		});

		this.componentDidMount();
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Navbar />
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<h2>Saved Books </h2>
							<Container className={classes.texts}>
								<MDBTable>
									<MDBTableHead color="primary-color" textWhite>
										<tr>
											<th>
												<h3>Results</h3>
											</th>
										</tr>
									</MDBTableHead>
									{this.state.books.map((book, index) => (
										<Container className={classes.result}>
											<MDBTableBody>
												<tr>
													<td>
														<Button
															variant="contained"
															color="secondary"
															onClick={this.onDelete}
															id={index}
														>
															{index} Delete
														</Button>
													</td>
												</tr>
												<tr>
													<td>
														<h4>Title:</h4> {book.title}
													</td>
												</tr>
												<td>
													<h4>Author:</h4> {book.author}
												</td>
												<tr />
												<tr>
													<td>
														<h4>Description:</h4> {book.description}
													</td>
												</tr>
												<tr>
													<td>
														<h4>Image: </h4>

														<img alt="imgbook" src={book.picture} />
													</td>
												</tr>
												<tr>
													<td>
														<h4>Link:</h4> <a href={book.link}>{book.link} </a>
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

export default withStyles(useStyles)(Saved);
