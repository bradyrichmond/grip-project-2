import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import wildTigerMenuText from './images/tiger_and_words.png';

class OrderNow extends Component {
  render() {
    return (
      <div className="navContainer">
        <img src={wildTigerMenuText} />
        <Link to='/menu'>
          <div className="ordernow-container">
            <div className="ordernow-button">
              ORDER NOW!
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default OrderNow;
