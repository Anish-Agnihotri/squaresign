import React from 'react';
import Pageheader from '../../components/Pageheader';
import Error from '../../components/Error';
import './index.css';

class Invitations extends React.Component {
	constructor () {
		super();

		this.state = {
			isAuthenticated: false
		};
	}
	render () {
		return (
			<div className="home">
				<Pageheader name="Invitations" text="Respond to signature requests or see invitations."/>
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

export default Invitations;
