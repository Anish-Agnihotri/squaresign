import React from 'react';
import Dropzone from 'react-dropzone';
import IPFS from 'ipfs-api';
import upload from './upload.png';
import document from './contract.png';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';

// web3
import Squarelink from 'squarelink';
import Web3 from 'web3';

const sqlk = new Squarelink('666b713c33ce39658967', 'rinkeby', { scope: ['user:name'], useSync: true });
const web3 = new Web3(sqlk.getProviderSync());

class CreateIPFS extends React.Component {
	
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
			uploadImage: upload,
			uploadString: 'Upload a document',
			added_file_hash: null,
			isLoading: false,
			isUploaded: false,
			defaultAccount: null,
			uploadButtonString: 'Upload a document',
			isSigned: false,
		}

		this.handleUpload = this.handleUpload.bind(this);
		this.checkButton = this.checkButton.bind(this);
		this.submitTransaction = this.submitTransaction.bind(this);
		this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001,protocol: 'https' });
	}

	handleUpload(file) {
		// Change uploaded document string and image
		const upload = file[0];
		this.setState({
			uploadImage: document,
			uploadString: upload.name,
			isLoading: true
		})

		let reader = new window.FileReader()
		reader.onloadend = () => this.ipfsSubmit(reader);
		reader.readAsArrayBuffer(upload);
	}

	ipfsSubmit = async (reader) => {
		let ipfsId;
		const buffer = await Buffer.from(reader.result);
		await this.ipfs.add(buffer)
		.then((response) => {
			ipfsId = response[0].hash;
			this.setState({added_file_hash: ipfsId, isLoading: false, isUploaded: true, uploadButtonString: 'Sign Document'});
			console.log(this.state.added_file_hash); // for testing purposes
		}).catch((err) => {
			console.error(err);
		})
	}

	arrayBufferToString = (arrayBuffer) => {
		return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer));
	}

	/* Submission logic */
	submitTransaction() {
		// IPFS passthrough
		let hex = web3.utils.asciiToHex(this.state.added_file_hash);
		const passthrough = web3.utils.soliditySha3(hex, Date.now());
		
		// additional default account setup
		this.setState({
			uploadButtonString: 'Transaction loading...',
			isSigned: true
		});
		this.checkButton();
	
		this.SquareSign.methods.addDocument(passthrough, hex).send({from: this.props.addr}).then(() => {
			const string = `${new Buffer(this.state.added_file_hash).toString('base64')}/${new Buffer(passthrough).toString('base64')}`;
			this.props.tabForward(string);
		});
	}

	checkButton() {
		if (this.state.isUploaded) {
			if (this.state.isSigned) {
				return <button onClick={this.props.tabForward} style={disabledButton} disabled><i className="fa fa-spinner fa-spin"></i></button>;
			} else {
				return <button onClick={this.submitTransaction}>{this.state.uploadButtonString}</button>;
			}
		} else {
			return <button onClick={this.props.tabForward} style={disabledButton} disabled>{this.state.uploadButtonString}</button>;
		}
	}

	render(props) {
		return(
			<div>
				<div>
					<h1>Upload document</h1>
					<p>Let's begin by uploading your document (to IPFS).</p>
					<Dropzone onDrop={acceptedFiles => this.handleUpload(acceptedFiles)}>
						{({getRootProps, getInputProps}) => (
							<section>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<img src={this.state.uploadImage} alt="Upload" />
								<h2>{this.state.uploadString}</h2>
							</div>
							</section>
						)}
					</Dropzone>
				</div>
				<div>
					<button onClick={this.props.tabBackward}>Back</button>
					{ this.state.isLoading 
						? (
							<button onClick={this.props.tabForward} style={disabledButton} disabled><i className="fa fa-spinner fa-spin"></i></button>
						)
						: (
							this.checkButton()
						)
					}
				</div>
			</div>
		);
	}
}

var disabledButton = {
	backgroundColor: 'rgb(179, 179, 179)',
	pointer: 'default'
};

export default CreateIPFS;
