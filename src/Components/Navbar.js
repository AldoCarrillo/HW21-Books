import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class Navbar extends Component {
	state = {};
	render() {
		return (
			<div>
				<ButtonGroup disableElevation variant="contained" color="primary">
					<Link to="/">
						<Button>Search</Button>
					</Link>
					<Link to="/Saved">
						<Button>Saved</Button>
					</Link>
				</ButtonGroup>
			</div>
		);
	}
}

export default Navbar;
