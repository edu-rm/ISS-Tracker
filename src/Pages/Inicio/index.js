import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet';

import bezierSpline from '@turf/bezier-spline';
import * as helpers from "@turf/helpers";

import ISSIcon from '../../components/Icon';

import api from '../../services/api';

import './styles.css';

function Inicio() {
  const [intial, setInitial] = useState([0,0]);
  const [iss, setIss] = useState([51.79149569528,132.52919955419]);
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [currentAlt, setCurrentAlt] = useState();
  const [currentVel, setCurrentVel] = useState();
  const curved = useCurvedLine();

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
            // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker 
            icon={ISSIcon}
            position={iss}
          />
          <GeoJSON
            // positions={[
            //   [-3.3237922,-61.1868745],
            //   [-6.0066284,-57.7040952],
            //   [-12.528837,-58.6294714],
            //   [-12.430272,-64.7201289]
            // ]}
            data={curved}
          />
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

function useCurvedLine(){
  const line = helpers.lineString(
    [
      [33.305896737965, 152.05984814213],
      [51.272908763976, -162.71917412412],
      [41.909832462086, -109.0896085631],
      [15.106467454388, -78.960508181027],
      [ -15.232644215422, -56.864203479881],
      // [15.106467454388, -78.960508181027],
      // [15.106467454388, -78.960508181027], 

    ].map(lngLat => [lngLat[1], lngLat[0]])
  );
  
  const curved = bezierSpline(line);
  console.log(curved);


  return curved;
}

export default Inicio;
