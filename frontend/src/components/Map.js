
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
const API_KEY = 'AIzaSyD7eXY9x2mbQ6-eiPsC9Hxljs6QsiWFGJs';

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 42.639512,
      lng:  23.369589
    },
    zoom: 11
  };


  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: new maps.LatLng(42.639512, 23.369589),
      map
    });
  }
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="map" style={{ height: '40vh', width: '40%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;
