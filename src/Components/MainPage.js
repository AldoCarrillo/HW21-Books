import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Saved from './Saved';
import Search from './Search';

class MainPage extends Component {
	state = {};
	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route path="/" exact component={Search} />
						<Route path="/Saved" component={Saved} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default MainPage;
