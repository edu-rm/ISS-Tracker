import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet';

import bezierSpline from '@turf/bezier-spline';
import * as helpers from "@turf/helpers";

import ISSIcon from '../../components/Icon';

import api from '../../services/api';

import './styles.css';

function Inicio() {
  const [iss, setIss] = useState([51.79149569528,132.52919955419]);
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [currentAlt, setCurrentAlt] = useState();
  const [currentVel, setCurrentVel] = useState();
  const [curved, setCurved] = useState();
  const [updateRoutes, setUpdateRoutes] = useState(false);



  async function requestRoutePosition(query){
    try {
      const response = await api.get(`satellites/25544/positions?timestamps=${query}`);
      const latLong = response.data
                        .map(info => [info.longitude, info.latitude]);

      const line = helpers.lineString(latLong);

      const data = bezierSpline(line);
      
      setCurved(data);

    }catch (e) {
      console.log(e);
    }
  }
  
  useEffect(() => {
      const timestamp = Math.trunc(Date.now()/1000);
      let queryString = '';
      console.log("executei");
      for(let i = 0; i < 2; i++) {
        queryString += `${timestamp + (i * 120)},`;
      }
    
      queryString = queryString.slice(0,-1);
      requestRoutePosition(queryString);

  },[updateRoutes])

  useEffect(() => {

    setInterval(() => {
      currentPosition();
    }, 5000);

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
        <Map center={[0,0]} zoom={1} >
          <TileLayer
            // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker 
            icon={ISSIcon}
            position={iss}
          />
          {curved && <GeoJSON data={curved} />}
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
          <button type="button" onClick={() => setUpdateRoutes(!updateRoutes)}>Atualizar Rotas</button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
