import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import api from '../../services/api';

import './styles.css';

function Inicio() {
  const [intial, setInitial] = useState([0,0]);
  const [iss, setIss] = useState([51.79149569528,132.52919955419]);
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [currentAlt, setCurrentAlt] = useState();
  const [currentVel, setCurrentVel] = useState();




  useEffect(() => {

    setInterval(() => {
      currentPosition();
    }, 1000);

    async function currentPosition(){
      try {
        const response = await api.get('/satellites/25544');
        const { latitude, longitude, altitude, velocity } = response.data;
        console.log(response.data);

        setIss([latitude, longitude]);

        let longString = String(longitude);
        longString = longString.substr(0, longString.length - 6);

        let latString = String(latitude);
        latString = latString.substr(0, latString.length - 6);

        setCurrentLat(latString);
        setCurrentLong(longString);
        setCurrentAlt(altitude);
        setCurrentVel(velocity);
      } catch (e) {
        console.log(e);
      }
    }    

  },[]);

  return (
    <div className="container-inicio">
      <div className="map">
        <Map center={[0,0]} zoom={2} >
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
            <p id="value">{currentLat}</p>
          </div>
          <div className="info-item">
            <p id="name">Long:</p>
            <p id="value">{currentLong}</p>
          </div>
          <div className="info-item">
            <p id="name">Alt:</p>
            <p id="value">{Math.trunc(currentAlt)} km</p>
          </div>
          <div className="info-item">
            <p id="name">Velocity:</p>
            <p id="value">{Math.trunc(currentVel)} km/h</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Inicio;
