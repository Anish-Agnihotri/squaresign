import React from 'react';
import Pageheader from '../../components/Pageheader';
import Error from '../../components/Error';
import './index.css';

class Dashboard extends React.Component {
	render () {
		return (
			<div className="home">
				<Pageheader name="Dashboard" text="Create new documents or track recent signatures."/>
			</div>
		);
	}
}

export default Dashboard;
