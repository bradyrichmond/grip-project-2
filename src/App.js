import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Contact from './Contact';
import OrderNow from './OrderNow';
import Menu from './Menu';
import Login from './Login';

import './style.css';

class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <Contact />
        <Router>
          <div className="contentContainer">
            <Route exact path='/' component={OrderNow} />
            <Route exact path='/menu' component={Menu} />
            <Route exact path='/login' component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
