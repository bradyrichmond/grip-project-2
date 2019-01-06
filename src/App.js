import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Contact from './Contact';
import Navigation from './Navigation';

import './style.css';

class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <Contact />
        <Navigation />
        <Router>
          <div>
            {/* <Route exact path='/' component={TweetList} /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
