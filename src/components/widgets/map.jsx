import React from "react";
import GoogleMapReact from 'google-map-react';

// the pointer marker
const Marker = () => (
    <i className="fas fa-map-marker-alt"/>
);

// display a map with the coordinates from server
function Map ({command}) {
    return (
        <React.Fragment>
            <h5 className="m-3 text-center">Your current position</h5>
            <div id="map" style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyAmsl1nJYSYJgmV4NFcIg7ay2-293venJY' }} defaultCenter={{ lat: command.lat, lng: command.lng }} defaultZoom={14}>
                    <Marker lat={command.lat} lng={command.lng} />
                </GoogleMapReact>
            </div>
        </React.Fragment>
    );
}

export default Map;