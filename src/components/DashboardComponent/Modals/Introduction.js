import React from 'react';
import Checkmark from './checkmark.png';

// TODO: Create component for three rules and animate.
class Introduction extends React.Component {
	render(props) {
		return(
			<div>
				<div>
					<h1>Create eSignature</h1>
					<p>Trusted eSignatures, backed by faith in the blockchain.</p>
					<br/>
					<div>
						<img src={Checkmark} alt='Checkmark'/>
						<div>
							<h1>Provably fair</h1>
							<p>Verify each signature.</p>
						</div>
					</div>
					<div>
						<img src={Checkmark} alt='Checkmark'/>
						<div>
							<h1>Easy to use</h1>
							<p>Quickly share a document link.</p>
						</div>
					</div>
					<div>
						<img src={Checkmark} alt='Checkmark'/>
						<div>
							<h1>Permanent</h1>
							<p>Stored securely on IPFS.</p>
						</div>
					</div>
					<div>
						<img src={Checkmark} alt='Checkmark'/>
						<div>
							<h1>Cost effective</h1>
							<p>Low costs to store large documents.</p>
						</div>
					</div>
				</div>
				<div>
					<button onClick={this.props.tabForward} className="started">Get Started</button>
				</div>
			</div>
		);
	}
}

export default Introduction;
