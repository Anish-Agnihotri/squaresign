import React from 'react';
import logo from './logo.png';
import { NavLink } from 'react-router-dom';
import { HamburgerButton } from 'react-hamburger-button';
import Modal from 'react-responsive-modal';
import './index.css';

class Header extends React.Component {

	showMenu(event) {
		event.preventDefault();
		
		this.setState({
			showMenu: !this.state.showMenu,
			open: !this.state.open
		});
	}

	linkCloseMenu(event) {
		event.preventDefault();

		this.setState({
			showMenu: false,
			open: false
		});
	}

	updateDimensions() {
		if (window.innerWidth > 800) {
			this.setState({
				showMenu: false,
				open: false,
				showMenuIcon: false
			});
		}
		else {
			this.setState({
				showMenuIcon: true
			});
		}
	}
	
	constructor() {
		super();
		
		this.state = {
			showMenu: false,
			showMenuIcon: true,
			isAuthenticated: false,
			modalOpen: false,
			userName: 'Dummy'
		};
		
		this.showMenu = this.showMenu.bind(this);
		this.linkCloseMenu = this.linkCloseMenu.bind(this);

		// Handle modal
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		// Authentication
		this.authenticate = this.authenticate.bind(this);
	}

	/* Modal setup */
	openModal() {
		this.setState({ modalOpen: true })
	}

	closeModal() {
		this.setState({ modalOpen: false, modalTab: 0 })
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	}

	/* Authentication */
	authenticate() {
		this.props.web3.eth.getAccounts().then((response) => {
			const userName = this.props.sqlk.getName();
			this.setState({
				isAuthenticated: true,
				userName: userName
			})
			this.closeModal();
			this.props.changeAddress(response[0]);
		});
	}

	render() {
		return(
			<div>
				<div className="header">
					<div className="subheader">
						<span>Effortless eSignatures via <a href='https://squarelink.com' rel='noopener noreferrer' target='_blank'>Squarelink</a>.</span>
					</div>
					<div className="mainheader">
						<div>
							<NavLink exact to="/"><img src={logo} alt="Logo" /></NavLink>
						</div>
						<div>
								{ 
									this.state.isAuthenticated
									? (
										<ul>
											<li><NavLink to="/dashboard" activeClassName="activeLink">Dashboard</NavLink></li>
											<li><div className="profile">{this.state.userName}</div></li>
										</ul>
									)
									: (
										<ul>
											<li><NavLink to="/dashboard" activeClassName="activeLink">Dashboard</NavLink></li>
											<li><button onClick={this.openModal} className="loginButton">Login</button></li>
										</ul>
									)
								}
							{
								this.state.showMenuIcon
									? (
										<HamburgerButton
											open={this.state.open}
											onClick={this.showMenu}
											strokeWidth={3}
											color="#000"
											height={17}
											width={25}
										/>
									)
									: (
										null
									)
							}
						</div>
						{
							this.state.showMenu
								? (
									<div>
										{ this.state.isAuthenticated
											? (
												<ul>
													<li><NavLink to="/dashboard" activeClassName="activeLink">Dashboard</NavLink></li>
													<li><NavLink to="/invitations" activeClassName="activeLink">Invitations</NavLink></li>
													<li><div className="profile">{this.state.userName}</div></li>
												</ul>
											)
											: (
												<ul>
													<li><NavLink to="/dashboard" activeClassName="activeLink">Dashboard</NavLink></li>
													<li><NavLink to="/invitations" activeClassName="activeLink">Invitations</NavLink></li>
													<li><button onClick={this.openModal} className="loginButton">Login</button></li>
												</ul>
											)
										}
									</div>
								)
								: (
									null
								)
						}
					</div>
				</div>
				<Modal
					className="protocolModal"
					open={this.state.modalOpen}
					onClose={this.closeModal}
					classNames={{
						overlay: "authOverlay",
						modal: "authModal"
					}}
					center
				>
					{ 
						<div>
							<div>
								<h1>Login</h1>
								<p>Easy login w/ Squarelink.</p>
							</div>
							<div>
								<button onClick={this.authenticate}>
									<div>
										<img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjMgMjMuMDUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTAgMGgxOGE1IDUgMCAwIDEgNSA1djEzLjA1YTUgNSAwIDAgMSAtNSA1aC0xM2E1IDUgMCAwIDEgLTUtNXptMy4yNCAyLjl2MTUuMjNhMiAyIDAgMCAwIDIgMmgxMi41NGEyIDIgMCAwIDAgMi0ydi0xMy4yM2EyIDIgMCAwIDAgLTItMnptMy41IDBoMy4yNnYxMS42M2EyIDIgMCAwIDEgLTIgMmgtNC43NnYtMi44MWgzLjV6bTkuNSAxNy4yM2gtMy4xOHYtMTEuNjNhMiAyIDAgMCAxIDItMmg0LjcydjIuODFoLTMuNXoiIGZpbGw9IiMzOTY0ZGYiLz48L3N2Zz4=" alt="SquareLink"/>
										<h1>Squarelink</h1>
									</div>
								</button>
							</div>
						</div>
					}
				</Modal>
			</div>
		);
	}
}

export default Header;
