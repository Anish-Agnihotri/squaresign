import React from 'react';
import Dropzone from 'react-dropzone';
import IPFS from 'ipfs-api';
import upload from './upload.png';
import document from './contract.png';

class CreateIPFS extends React.Component {
	constructor() {
		super();
	
		this.state = {
			uploadImage: upload,
			uploadString: 'Upload a document',
			added_file_hash: null
		}

		this.handleUpload = this.handleUpload.bind(this);
		this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001,protocol: 'https' });
	}
	handleUpload(file) {
		// Change uploaded document string and image
		const upload = file[0];
		this.setState({
			uploadImage: document,
			uploadString: upload.name
		})

		let reader = new window.FileReader()
		reader.onloadend = () => this.ipfsSubmit(reader);
		reader.readAsArrayBuffer(upload);
	}

	ipfsSubmit = async (reader) => {
		let ipfsId;
		const buffer = await Buffer.from(reader.result)
		await this.ipfs.add(buffer)
		.then((response) => {
			console.log(response)
			ipfsId = response[0].hash
			console.log(ipfsId)
			this.setState({added_file_hash: ipfsId})
		}).catch((err) => {
			console.error(err)
		})
	}

	arrayBufferToString = (arrayBuffer) => {
		return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer));
	}

	render(props) {
		return(
			<div>
				<div>
					<h1>1. Upload to IPFS</h1>
					<p>First, let's upload your document to IPFS.</p>
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
					<button onClick={this.props.tabForward}>Next Step</button>
				</div>
			</div>
		);
	}
}

export default CreateIPFS;
