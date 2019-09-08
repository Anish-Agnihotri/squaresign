import React from 'react';
import errorfix from './errorfix.png';
import './index.css'

class Error extends React.Component {
	constructor() {
		super();

		this.authenticate = this.authenticate.bind(this);
	}
	authenticate() {
		console.log('temporary');
	}
	render(props) {
		return(
			<div className="error">
				<div className="spacer center">
					<div className="alert-error">
						<div>
							<h1>Not signed in!</h1>
							<p>Oops! It looks like you're not signed in yet!<br/>Press the login button to continue.</p>
							<img src={errorfix} alt='Circle outlining Login button in header' />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Error;
