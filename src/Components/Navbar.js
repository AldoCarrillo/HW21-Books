import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';

class Navbar extends Component {
	state = {};
	render() {
		return (
			<div>
				{/* <ButtonGroup disableElevation variant="contained" color="primary"> */}
				<Link to="/">
					<Button variant="contained" color="primary">
						Search
					</Button>
				</Link>

				<Link to="/Saved">
					<Button variant="contained" color="secondary">
						Saved
					</Button>
				</Link>
				{/* </ButtonGroup> */}
			</div>
		);
	}
}

export default Navbar;
