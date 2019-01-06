import React, { Component } from 'react';

import Map from './Map';

class Contact extends Component {
  constructor(props) { 
    super(props);

    this.state = {
      mapOpen: false
    }

    this.toggleMap = this.toggleMap.bind(this);
  }

  toggleMap() {
    var open = !this.state.mapOpen;
    this.setState({mapOpen: open});
  }

  render() {
    return (
      <div className="contactContainer">
        <div className="addressContainer">
            <p onClick={this.toggleMap}>1825 SE 164th AVE STE 101 VANCOUVER, WA</p>
            <div className={`mapContainer ${this.state.mapOpen ? 'open' : ''}`}>
              <Map />
            </div>
        </div>
        <div className="phoneContainer">
            <a href="tel:360-882-8887">360.882.8887</a>
        </div>
      </div>
    );
  }
}

export default Contact;
