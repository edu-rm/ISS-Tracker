import React, { useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import './styles.css';

function Inicio() {
  const [intial, setInitial] = useState([0,0]);
  const [iss, setIss] = useState([51.79149569528,132.52919955419]);

  return (
    <div className="container-inicio">
      <div className="map">
        <Map center={intial} zoom={2} >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={iss}/>
        </Map>
      </div>
      <div className="info">
        <h3>Information</h3>
        <div className="info-content">
          <p>Lat: 8543985493</p>
          <p>Long: 8543985493</p>
          <p>Lat: 8543985493</p>
          <p>Long: 8543985493</p>
          <p>Lat: 8543985493</p>
          <p>Long: 8543985493</p>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
