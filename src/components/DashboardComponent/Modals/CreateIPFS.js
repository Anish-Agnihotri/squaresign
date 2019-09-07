import React from 'react';
import Dropzone from 'react-dropzone';
import upload from './upload.png';
import document from './contract.png';

// TODO: Create component for three rules and animate.
class CreateIPFS extends React.Component {
	constructor() {
		super();

		this.state = {
			uploadImage: upload,
			uploadString: 'Upload a document'
		}

		this.handleUpload = this.handleUpload.bind(this);
	}
	handleUpload(file) {
		console.log(file);

		// Change uploaded document string and image
		const fileName = file[0].name;
		this.setState({
			uploadImage: document,
			uploadString: fileName
		})
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
