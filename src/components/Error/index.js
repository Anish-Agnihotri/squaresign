import React from 'react';
import './index.css'

class Error extends React.Component {
	render(props) {
		return(
			<div className="error">
				<div className="spacer">
					<div className="alert-danger">
						<p>Error</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Error;
