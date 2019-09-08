import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Home extends React.Component {
	render () {
		return (
			<div className="App">
				<div className="svg firstSvg">
					<svg width="250" height="500" viewBox="0 0 97 267" fill="none">
						<path d="M59.1032 145.522C60.0177 144.903 60.2568 143.659 59.6373 142.745L-25.0474 17.7398C-25.6669 16.8253 -26.9104 16.5862 -27.8249 17.2057L-152.83 101.89C-153.744 102.51 -153.983 103.753 -153.364 104.668L-68.6791 229.673C-68.0596 230.587 -66.8161 230.826 -65.9016 230.207L59.1032 145.522Z" fill="#2b71ff"></path>
						<path d="M71.6288 146.929C72.086 146.62 72.2056 145.998 71.8958 145.541L-23.0707 5.35855C-23.3804 4.9013 -24.0022 4.78174 -24.4594 5.09151L-164.641 100.058C-165.099 100.368 -165.218 100.99 -164.908 101.447L-69.942 241.629C-69.6322 242.086 -69.0105 242.206 -68.5532 241.896L71.6288 146.929Z" stroke="black" strokeWidth="2"></path>
					</svg>
				</div>
				<div className="svg secondSvg">
					<svg width="250" height="500" viewBox="0 0 97 267" fill="none">
						<circle cx="134.218" cy="134.218" r="111.849" transform="rotate(167.754 134.218 134.218)" stroke="black" strokeWidth="2"></circle>
						<circle cx="129.194" cy="140.125" r="107.136" transform="rotate(167.754 134.194 138.125)" fill="#2b71ff"></circle>
					</svg>
				</div>
				<div className="pageItem">
					<div className="home-cta">
						<div>
							<h1>Documents secured</h1>
							<h1>w/ trustless signing</h1>
							<p>Easily upload and share important documents with loved ones, health and government professionals, and more. As soon as they access the files, their signature is automatically applied and stored on the blockchain.</p>
							<div>
								<Link to="/dashboard">Visit Dashboard</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
