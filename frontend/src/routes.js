import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Global from './styles/global';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Bolt from './pages/Bolt';

const Routes = () => {
	return (
		<BrowserRouter>
			<Route path="/" component={Home} exact />
			<Route path="/dashboard" component={Dashboard} exact />
			<Route path="/dashboard/bolt" component={Bolt} exact />
			<Route path="/dashboard/uber" component={Dashboard} exact />
			<Global />
		</BrowserRouter>
	);
};
export default Routes;
