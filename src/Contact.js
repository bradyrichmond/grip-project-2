import React, { Component } from 'react';

class Contact extends Component {

  render() {
    return (
      <div className="contactContainer">
        <div className="addressContainer">
            <p>1825 SE 164th AVE STE 101 VANCOUVER, WA</p>
        </div>
        <div className="phoneContainer">
            <a href="tel:360-882-8887">360.882.8887</a>
        </div>
      </div>
    );
  }
}

export default Contact;
