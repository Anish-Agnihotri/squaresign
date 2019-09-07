import React from 'react';
import Pageheader from '../../components/Pageheader';
import Error from '../../components/Error';
import './index.css';

class Dashboard extends React.Component {
	constructor () {
		super();

		this.state = {
			isAuthenticated: false
		};
	}
	render () {
		return (
			<div className="home">
				<Pageheader name="Dashboard" text="Create new documents or track recent signatures."/>
				{ this.state.isAuthenticated 
					? (
						<div className="spacer">
							<p>Authenticated</p>
						</div>
					)
					: (
						<Error />
					)
				}
			</div>
		);
	}
}

export default Dashboard;
