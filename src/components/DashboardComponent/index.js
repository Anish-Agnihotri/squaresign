import React from 'react';
import Modal from 'react-responsive-modal';
import firebase from 'firebase';
import contract from './Modals/contract.png';
import './index.css'

import Introduction from './Modals/Introduction.js';
import CreateIPFS from './Modals/CreateIPFS.js';
import CreateLink from './Modals/CreateLink.js';

class Error extends React.Component {
	constructor() {
		super();

		this.state = {
			modalOpen: false,
			modalTab: 0,
			cards: [],
			text: 'Copy Link',
			rendered: false
		}

		// Handle modal
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		
		// Handle modal tabs
		this.tabForward = this.tabForward.bind(this);
		this.tabBackward = this.tabBackward.bind(this);
		this.renderTab = this.renderTab.bind(this);
		this.returnAddressTab = this.returnAddressTab.bind(this);

		// Render other documents
		/*this.renderOtherDocuments = this.renderOtherDocuments.bind(this);
		this.handleCopy = this.handleCopy.bind(this);
		this.handleLeave = this.handleLeave.bind(this);

		const firebaseConfig = {
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

	/* Modal setup */
	openModal() {
		this.setState({ modalOpen: true })
	}

	closeModal() {
		this.setState({ modalOpen: false, modalTab: 0 })
	}

	tabForward() {
		this.setState({ modalTab: this.state.modalTab + 1});
	}

	tabBackward() {
		this.setState({ modalTab: this.state.modalTab - 1 });
	}

	returnAddressTab(value) {
		const returnedValue = value;
		this.setState({
			hash: returnedValue
		})
		this.tabForward();
	}

	renderTab() {
		if (this.state.modalTab === 0) {
			return <Introduction tabForward={this.tabForward}/>;
		}
		else if (this.state.modalTab === 1) {
			return <CreateIPFS tabBackward={this.tabBackward} tabForward={this.returnAddressTab} addr={this.props.addr}/>;
		}
		else if (this.state.modalTab === 2) {
			return <CreateLink tabBackward={this.tabBackward} tabForward={this.closeModal} hash={this.state.hash} addr={this.props.addr}/>;
		}
	}

	/*renderOtherDocuments() {
		const ipfsRef = firebase.database().ref('hashes');
		ipfsRef.on('value', (snapshot) => {
			let hashes = snapshot.val();
			
			for (let hash in hashes) {
				if (hashes[hash].address === this.props.addr) {
					this.setState({
						hashAddr: hashes[hash].address,
						hashvalue: hashes[hash].value,
						rendered: true
					})
				}
			}
		});
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

	componentDidMount() {
		
	}*/

	render(props) {
		return(
			<div className="dashboard-comp">
				<div className="spacer">
					<button onClick={this.openModal} className="document create">
						<h2>+ New Document</h2>
					</button>
				</div>
				<Modal
					className="dashboardModal"
					open={this.state.modalOpen}
					onClose={this.closeModal}
					classNames={{
						overlay: "dashboardOverlay",
						modal: "dashboardModal"
					}}
					center
				>
					{ this.renderTab() }
				</Modal>
			</div>
		);
	}
}

/*
					/*{ this.state.rendered 
						? (
							<div className="document documentDiv"><div><img src={contract} alt='contract' /><p>{this.state.hashAddr}</p></div><div><input ref={(input) => this.input = input} value={this.state.hashValue} readOnly/><button onClick={this.handleCopy} onMouseLeave={this.handleLeave}>{this.state.text}</button></div></div>
						)
						: (
							null
						)
					}*/

export default Error;
