import React from 'react';

// TODO: Create component for three rules and animate.
class CreateLink extends React.Component {
	constructor() {
		super();

		this.state = {
			text: 'Copy Link'
		}

		this.handleCopy = this.handleCopy.bind(this);
		this.handleLeave = this.handleLeave.bind(this);
	}
	handleCopy() {
		this.input.select();
		document.execCommand('copy');
		this.setState({
			text: 'Copied'
		})
	}
	handleLeave() {
		this.setState({
			text: 'Copy Link'
		})
	}
	render(props) {
		return(
			<div>
				<div>
					<h1>Share document</h1>
					<p>You're good to go! Share this link to your signees.</p>
					<span>
						<input ref={(input) => this.input = input} value={`http://localhost:3000/view/${this.props.hash}`} readOnly/>
						<button onClick={this.handleCopy} onMouseLeave={this.handleLeave}>
							{this.state.text}
						</button>
					</span>
				</div>
				<div>
					<button onClick={this.props.tabBackward}>Back</button>
					<button onClick={this.props.tabForward}>Done</button>
				</div>
			</div>
		);
	}
}

export default CreateLink;
