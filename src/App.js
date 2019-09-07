import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

// header setup
import Header from './components/Header';

// page setup
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Invitations from './pages/Invitations';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
            <Header />

            <Route path="/" exact component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/invitations" component={Invitations} />
        </Router>
      </div>
    );
  }
}

export default App;
