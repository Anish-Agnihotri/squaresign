import React from 'react';
// import mailgun from 'mailgun.js';

//var mg = mailgun.client({username: 'contact+squaresign@anishagnihotri.com', key: process.env.MAILGUN_API_KEY || '15d382998d0bfaf3746e9b87c117841c-4167c382-aaacbfe6'});

// TODO: Create component for three rules and animate.
class CreateLink extends React.Component {
	constructor() {
		super();

		this.state = {
			text: 'Copy Link'
		}

		this.handleCopy = this.handleCopy.bind(this);
		this.handleLeave = this.handleLeave.bind(this);

		/*const firebaseConfig = {
			apiKey: "AIzaSyAgvQ-YdKBI-4oLxyi_Swe-GXL1rZg-FR8",
			authDomain: "squaresign-30ba3.firebaseapp.com",
			databaseURL: "https://squaresign-30ba3.firebaseio.com",
			projectId: "squaresign-30ba3",
			storageBucket: "",
			messagingSenderId: "282029414972",
			appId: "1:282029414972:web:e1493677a77dc4b22b0139"
		};

		firebase.initializeApp(firebaseConfig);*/
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
	/*tabDone() {
		mg.messages.create('sandbox-123.mailgun.org', {
			from: "Excited User <mailgun@sandbox-123.mailgun.org>",
			to: ["contact@anishagnihotri.com"],
			subject: "Hello",
			text: "Testing some Mailgun awesomness!",
			html: "<h1>Testing some Mailgun awesomness!</h1>"
		})
		  .then(msg => console.log(msg)) // logs response data
		  .catch(err => console.log(err)); // logs any error

		this.props.tabFoward();
	}*/
	/*tabDone() {
		const address =`http://localhost:3000/view/${this.props.hash}`;

		const ipfsRef = firebase.database().ref('hashes');
		const hash = {
			value: address,
			address: this.props.addr
		}
		ipfsRef.push(hash);
		this.props.tabFoward();
	}*/
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
