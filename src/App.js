import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import InfoShow from './components/InfoShow';

class App extends Component {
  render() {
    return (
      <Router>
        <div>        
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/show/:id" component={InfoShow} />
        </div>
      </Router>
    );
  }
}

export default App;
