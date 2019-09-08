import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

// header setup
import Header from './components/Header';

// page setup
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import View from './pages/View';

// web3
import Squarelink from 'squarelink';
import Web3 from 'web3';

const sqlk = new Squarelink('666b713c33ce39658967', 'rinkeby', { scope: ['user:name'], useSync: true });
const provider = new Web3(sqlk.getProviderSync());

class App extends React.Component {
  constructor() {
    super();

    // Highest level state management
    this.state = {
      addr: null
    }

    this.changeAddr = this.changeAddr.bind(this);
  }
  changeAddr(value) {
    const returnedValue = value;
    this.setState({
      addr: returnedValue
    })
  }
  componentDidMount() {
    document.title = 'Squaresign';
  }
  render() {
    return (
      <div className="App">
        <Router>
            <Header web3={provider} sqlk={sqlk} changeAddress={this.changeAddr}/>

            <Route path="/" exact component={Home}/>
            <Route path="/dashboard" component={() => <Dashboard addr={this.state.addr}/>} />
            <Route path="/view" component={() => <View addr={this.state.addr}/>} />
        </Router>
      </div>
    );
  }
}

export default App;
