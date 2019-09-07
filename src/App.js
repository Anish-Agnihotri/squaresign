import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

// header setup
import Header from './components/Header';

// page setup
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Invitations from './pages/Invitations';

// web3
import Squarelink from 'squarelink';
import Web3 from 'web3';

const sqlk = new Squarelink('666b713c33ce39658967', 'rinkeby', { scope: ['user:name'], useSync: true });
const provider = new Web3(sqlk.getProviderSync());


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
            <Header web3={provider} sqlk={sqlk} />

            <Route path="/" exact component={Home} />
            <Route path="/dashboard" component={Dashboard} web3={provider} sqlk={sqlk} />
            <Route path="/invitations" component={Invitations} web3={provider} sqlk={sqlk}/>
        </Router>
      </div>
    );
  }
}

export default App;
