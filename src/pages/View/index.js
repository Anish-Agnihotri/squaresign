import React from 'react';
import Pageheader from '../../components/Pageheader';
import Error from '../../components/Error';
import './index.css';

// web3
import Squarelink from 'squarelink';
import Web3 from 'web3';

const sqlk = new Squarelink('666b713c33ce39658967', 'rinkeby', { scope: ['user:name'], useSync: true });
const web3 = new Web3(sqlk.getProviderSync());

class View extends React.Component {
	constructor() {
		super();

		this.SquareSign = new web3.eth.Contract([
			{
				"constant": true,
				"inputs": [
					{
						"name": "",
						"type": "bytes32"
					}
				],
				"name": "documents",
				"outputs": [
					{
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"name": "ipfs_hash",
						"type": "bytes"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "",
						"type": "address"
					},
					{
						"name": "",
						"type": "uint256"
					}
				],
				"name": "users",
				"outputs": [
					{
						"name": "",
						"type": "bytes"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "id",
						"type": "bytes"
					}
				],
				"name": "getSignatures",
				"outputs": [
					{
						"name": "",
						"type": "address[]"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "id",
						"type": "bytes"
					},
					{
						"name": "ipfs",
						"type": "bytes"
					}
				],
				"name": "addDocument",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "id",
						"type": "bytes"
					}
				],
				"name": "signDocument",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}
		], '0x08b9118ee694e6f85a8398a5bde54e24ec061aab');

		this.state = {
			passthrough: null,
			hash: null,
			hasSigned: false,
			loading: false,
			subheader: "You've received a document to view!"
		}

		this.viewDocument = this.viewDocument.bind(this);
		this.showUsers = this.showUsers.bind(this);
	}
	viewDocument() {
		this.setState({
			loading: true,
		})

		// Default account
		this.SquareSign.methods.signDocument(this.state.hash).send({from: this.props.addr}).then(() => {
			this.setState({
				hasSigned: true,
				loading: false
			})
			const array = [];
			this.SquareSign.methods.getSignatures(this.state.hash).call().then((signatures) => { 
				signatures.forEach(function(sig) {
					array.push(sig);
				})
				const uniqueArray = Array.from(new Set(array));
				this.setState({
					uniqueAddresses: uniqueArray,
					uniqueLength: uniqueArray.length
				})
			})
		});
	}

	showUsers() {
		let appendArray = [];
		for (let i = 0; i < this.state.uniqueLength; i++) {
			appendArray.push(<li className="addressItem" key={i}><a href={`https://rinkeby.etherscan.io/address/${this.state.uniqueAddresses[i]}`} target="_blank" rel="noopener noreferrer">{this.state.uniqueAddresses[i]}</a></li>)
		}
		console.log(appendArray);
		return appendArray;
	}
	componentDidMount() {
		const location = window.location.pathname.slice(6);
		this.setState({
			passthrough: new Buffer(location.split('/')[0], 'base64').toString('utf-8'),
			hash: new Buffer(location.split("/").pop(), 'base64').toString('utf-8')
		})
	}
	render () {
		return (
			<div className="home">
				<Pageheader name="View Document" text={this.state.subheader}/>
				{ this.props.addr === null
					? (
						<Error />
					)
					: (
						<div>
							{
								!this.state.hasSigned
								? (
									<div className="spacer center">
										<div className="toBeSigned">
											<div>
												<h1>Record Access</h1>
												<p>We track every user who has had access to a document (similar to a NDA).<br />This is binding and final on the blockchain, so please review now.</p>
												{
													this.state.loading
													? (
														<button className="signDocument" onClick={this.viewDocument} style={disabledButton} disabled>
															<div>
																<i className="fa fa-spinner fa-spin"></i>
															</div>
														</button>
													)
													: (
														<button className="signDocument" onClick={this.viewDocument}>
															<div>
																<img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjMgMjMuMDUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTAgMGgxOGE1IDUgMCAwIDEgNSA1djEzLjA1YTUgNSAwIDAgMSAtNSA1aC0xM2E1IDUgMCAwIDEgLTUtNXptMy4yNCAyLjl2MTUuMjNhMiAyIDAgMCAwIDIgMmgxMi41NGEyIDIgMCAwIDAgMi0ydi0xMy4yM2EyIDIgMCAwIDAgLTItMnptMy41IDBoMy4yNnYxMS42M2EyIDIgMCAwIDEgLTIgMmgtNC43NnYtMi44MWgzLjV6bTkuNSAxNy4yM2gtMy4xOHYtMTEuNjNhMiAyIDAgMCAxIDItMmg0LjcydjIuODFoLTMuNXoiIGZpbGw9IiMzOTY0ZGYiLz48L3N2Zz4=" alt="SquareLink"/>
																<h1>Squarelink</h1>
															</div>
														</button>
													)
												}
											</div>
										</div>
									</div>
								)
								: (
									<div className="the-section">
										<div className="left-section">
											<h1>Retrieved Document</h1>
											<iframe src={`http://ipfs.io/ipfs/${this.state.passthrough}`} title="frame"/>
										</div>
										<div className="right-section">
											<h1>Other signees</h1>
											<p>The following addresses have cryptographically signed this document:</p>
											<div>
												<ul>
													{this.showUsers()}
												</ul>
											</div>
										</div>
									</div>
								)
							}
						</div>
					)
						}
				</div>
		)
	}
}

var disabledButton = {
	backgroundColor: 'rgb(179, 179, 179)',
	pointer: 'default'
};

export default View;
