import React from 'react';
import Pageheader from '../../components/Pageheader';
import './index.css';

class Invitations extends React.Component {
	render () {
		return (
			<div className="home">
				<Pageheader name="Invitations" text="Respond to signature requests or see invitations."/>
			</div>
		);
	}
}

export default Invitations;
