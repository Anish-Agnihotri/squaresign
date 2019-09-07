import React from 'react';

// TODO: Create component for three rules and animate.
class CreateLink extends React.Component {
	render(props) {
		return(
			<div>
				<div>
					<h1>2. Create a Link</h1>
					<p>First, let's create a swap contract for your Token.</p>
				</div>
				<div>
					<button onClick={this.props.tabBackward}>Back</button>
					<button onClick={this.props.tabForward}>Next Step</button>
				</div>
			</div>
		);
	}
}

export default CreateLink;
