import React, { Component } from 'react';
import wildTigerMenuText from './images/wildTigerMenuText.png';

class Navigation extends Component {
  render() {
    return (
      <div className="navContainer">
        <img src={wildTigerMenuText} />
      </div>
    );
  }
}

export default Navigation;
