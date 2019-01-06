import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 45.6071097,
      lng: -122.5042307
    },
    zoom: 17
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '30rem', width: '30rem' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBT-ZQ7G1yRprSp6geK4CtE5ahz7HCQFjE' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;