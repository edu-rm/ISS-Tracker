import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import bezierSpline from '@turf/bezier-spline';
import * as helpers from "@turf/helpers";

import ISSIcon from '../../components/Icon';

import api from '../../services/api';

import './styles.css';

// longitude : -180 até 180
// latitude : -90 até 90


function Inicio() {
  const [iss, setIss] = useState([51.79149569528,132.52919955419]);
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [currentAlt, setCurrentAlt] = useState();
  const [currentVel, setCurrentVel] = useState();
  const [futureInicio, setFutureInicio] = useState();
  const [futureBreak, setFutureBreak] = useState();

  const [past, setPast] = useState([]);
  const [updateRoutes, setUpdateRoutes] = useState(1);

  async function requestRoutePosition(queryFuture, queryPast){
    try {
      const response = await api.get(`satellites/25544/positions?timestamps=${queryFuture}`);
      const pos_inicialLongitude = response.data[0].longitude;
      // console.log(pos_inicialLongitude);
      // se a posição inicial dele for maior que a próxima, ele mudou.

      let inicio = [];
      let inicioBreak= [];

      for(let i = 0 ; i< response.data.length ; i++){
        if(pos_inicialLongitude <= response.data[i].longitude){
          inicio[i] = response.data[i]; 
        }else {
          inicioBreak[i - inicio.length] = response.data[i];
        }
      }

      console.log(inicio)
      console.log(inicioBreak)

      if(inicio.length >=1){
        const lineInicio = helpers.lineString(inicio.map(info => [info.longitude, info.latitude]));
        const bezierInicio = bezierSpline(lineInicio);
        setFutureInicio(bezierInicio);

      }

      if(inicioBreak.length >=1){
        const lineBreak = helpers.lineString(inicioBreak.map(info => [info.longitude, info.latitude]));
        const bezierBreak = bezierSpline(lineBreak);
        setFutureBreak(bezierBreak); 
      }

      

    }catch (e) {
      console.log(e);
    }
    try {
      const response = await api.get(`satellites/25544/positions?timestamps=${queryPast}`);
      const pos_inicialLongitude = response.data[0].longitude;

      let inicio = [{}];
      let inicioBreak= [{}];

      for(let i = 0 ; i< response.data.length ; i++){
        if(pos_inicialLongitude >= response.data[i].longitude){
          inicio[i] = response.data[i]; 
        }else {
          inicioBreak[i - inicio.length] = response.data[i];
        }
      }
      // console.log(inicio);
      // console.log(inicioBreak);

      const lineInicio = helpers.lineString(inicio.map(info => [info.longitude, info.latitude]));
      const lineBreak = helpers.lineString(inicioBreak.map(info => [info.longitude, info.latitude]));


      const bezierInicio = bezierSpline(lineInicio);
      const bezierBreak = bezierSpline(lineBreak);

      setPast([bezierInicio, bezierBreak]); 


    }catch (e) {
      console.log(e);
    }
  }
  
  useEffect(() => {
      const timestamp = Math.trunc(Date.now()/1000);
      let queryStringFuture = '';
      let queryStringPast = '';

      // console.log("executei");
      for(let i = 0; i < 45; i++) {
        queryStringFuture += `${timestamp + (i * 120)},`;
      }
      for(let i = 0; i < 45; i++) {
        queryStringPast += `${timestamp + (i * -120)},`;
      }
    
      queryStringFuture = queryStringFuture.slice(0,-1);

      queryStringPast = queryStringPast.slice(0,-1);

      requestRoutePosition(queryStringFuture, queryStringPast);

  },[updateRoutes])

  useEffect(() => {

    setInterval(() => {
      currentPosition();
    }, 1000);

    async function currentPosition(){
      try {
        const response = await api.get('/satellites/25544');
        const { latitude, longitude, altitude, velocity } = response.data;

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
        <Map center={[0,0]} zoom={-1} >
          <TileLayer
            // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            noWrap={true}
            
          />
          <Marker 
            icon={ISSIcon}
            position={iss}
          />
          {futureInicio && <GeoJSON color="black" data={futureInicio}/>}
          {futureBreak && <GeoJSON color="black" data={futureBreak} />}

          {/* {past && past.map(linha => <GeoJSON color="red" data={linha} />)} */}
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
          {/* <button type="button" onClick={() => setUpdateRoutes(!updateRoutes)}>Atualizar Rotas</button> */}
        </div>
      </div>
    </div>
  );
}

export default Inicio;
