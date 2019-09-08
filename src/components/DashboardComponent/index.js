import React from 'react';
import Modal from 'react-responsive-modal';
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
		}

		// Handle modal
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		
		// Handle modal tabs
		this.tabForward = this.tabForward.bind(this);
		this.tabBackward = this.tabBackward.bind(this);
		this.renderTab = this.renderTab.bind(this);
		this.returnAddressTab = this.returnAddressTab.bind(this);
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
			return <CreateIPFS tabBackward={this.tabBackward} tabForward={this.returnAddressTab} />;
		}
		else if (this.state.modalTab === 2) {
			return <CreateLink tabBackward={this.tabBackward} tabForward={this.closeModal} hash={this.state.hash}/>;
		}
	}

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

export default Error;
