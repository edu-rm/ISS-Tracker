import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import api from '../../services/api';

import './styles.css';

function Inicio() {
  const [intial, setInitial] = useState([0,0]);
  const [iss, setIss] = useState([51.79149569528,132.52919955419]);

  useEffect(() => {
    
    setInterval(() => {
      currentPosition();
    }, 1000);

    async function currentPosition(){
      try {
        const response = await api.get('/satellites/25544');
        const { latitude, longitude } = response.data;
        setIss([latitude, longitude]);
      } catch (e) {
        console.log(e);
      }
    }    

  },[]);

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
          <div className="info-item">
            <p id="name">Lat:</p>
            <p id="value">-32.0000</p>
          </div>
          <div className="info-item">
            <p id="name">Long:</p>
            <p id="value">-42.0000</p>
          </div>
          <div className="info-item">
            <p id="name">Alt:</p>
            <p id="value">500 km</p>
          </div>
          <div className="info-item">
            <p id="name">Velocity:</p>
            <p id="value">27000 km/h</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Inicio;
