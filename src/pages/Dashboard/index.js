import React from 'react';
import Pageheader from '../../components/Pageheader';
import DashboardComponent from '../../components/DashboardComponent';

// web3
import Squarelink from 'squarelink';
import Web3 from 'web3';

const sqlk = new Squarelink('666b713c33ce39658967', 'rinkeby', { scope: ['user:name'], useSync: true });
const web3 = new Web3(sqlk.getProviderSync());

class Dashboard extends React.Component {
	render () {
		return (
			<div className="home">
				<Pageheader name="Dashboard" text="Create new documents or track recent signatures."/>
				<DashboardComponent web3={web3} sqlk={sqlk}/>
			</div>
		);
	}
}

export default Dashboard;
