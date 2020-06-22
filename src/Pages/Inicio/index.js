import React, { useState, useEffect, useContext } from 'react';
import { Map, TileLayer, Marker, GeoJSON, Circle } from 'react-leaflet';
import bezierSpline from '@turf/bezier-spline';
import * as helpers from "@turf/helpers";

import { ThemeContext } from '../../hooks/ThemeContext';

import Config from '../../components/Config';

import './styles.css';

import ISSIcon from '../../components/Icon/iss';
import you from '../../components/Icon/user';
import red_line from '../../assets/red_line.png';
import green_line from '../../assets/green_line.png';
import api from '../../services/api';

// longitude : -180 até 180
// latitude : -90 até 90


function Inicio() {
  const { theme } = useContext(ThemeContext);

  const [iss, setIss] = useState([0,0]);
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [currentAlt, setCurrentAlt] = useState();
  const [currentVel, setCurrentVel] = useState();
  const [currentFootprint, setCurrentFootprint] = useState();

  const [futureInicio, setFutureInicio] = useState();
  const [futureBreak, setFutureBreak] = useState();

  const [pastInicio, setPastInicio] = useState();
  const [pastBreak, setPastBreak] = useState();

  const [updateRoutes, setUpdateRoutes] = useState(false);

  const [userPosition, setUserPosition] = useState();

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

      if(inicio.length >= 2){
        const lineInicio = helpers.lineString(inicio.map(info => [info.longitude, info.latitude]));
        const bezierInicio = bezierSpline(lineInicio);
        setFutureInicio(bezierInicio);

      }

      if(inicioBreak.length >= 2){
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

      if(inicio.length >= 2){
        const lineInicio = helpers.lineString(inicio.map(info => [info.longitude, info.latitude]));
        const bezierInicio = bezierSpline(lineInicio);
        setPastInicio(bezierInicio);

      }

      if(inicioBreak.length >= 2){
        const lineBreak = helpers.lineString(inicioBreak.map(info => [info.longitude, info.latitude]));
        const bezierBreak = bezierSpline(lineBreak);
        setPastBreak(bezierBreak); 
      }


    }catch (e) {
      console.log(e);
    }
  }

  useEffect(()=>{
    if(!(navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    )){
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
      });
    }

  }, []);

  useEffect(() => {
      const timestamp = Math.trunc(Date.now()/1000);
      let queryStringFuture = '';

      let queryStringPast = '';

      for(let i = 0; i < 46; i++) {
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
    const timer = setInterval(() => {
      currentPosition();
    }, 2000);

    async function currentPosition(){
      try {
        const response = await api.get('/satellites/25544');
        const { 
          latitude, 
          longitude, 
          altitude, 
          velocity, 
          footprint
        } = response.data;

        setIss([latitude, longitude]);

        let longString = String(longitude);
        longString = longString.substr(0, longString.length - 6);

        let latString = String(latitude);
        latString = latString.substr(0, latString.length - 6);

        setCurrentLat(latString);
        setCurrentLong(longString);
        setCurrentAlt(altitude);
        setCurrentVel(velocity);
        setCurrentFootprint(footprint);
        // setSolar([solar_lon, solar_lat]);
        // const lineSolar = helpers.lineString(solarArray);

        // const bezierSolar= bezierSpline(lineSolar);
        // console.log(bezierSolar);
        // setSolar(bezierSolar);
      } catch (e) {
        console.log(e);
      }
    }  
    
    return () => clearTimeout(timer);

  },[]);

  return (
    <div className="container-inicio">
      <div className="map">
        <Map center={userPosition || [0,0]} zoom={2} >
          {
            theme.papel 
            &&  
            <TileLayer
              url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              noWrap={true}
            />
          }
          {
            theme.dark 
            &&  
            <TileLayer
              url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />
          }
          {
            theme.fire 
            &&  
            <TileLayer
              url='https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          }
          {
            theme.satelite 
            &&  
            <TileLayer
              url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            />
          }
          <Marker 
            icon={ISSIcon}
            position={iss}
          />
          {
          userPosition 
          && 
          <Marker 
            icon={you} 
            position={userPosition}
          />
          }

          {currentFootprint && <Circle color='' center={[currentLat, currentLong]} radius={currentFootprint*500}/>}
          {futureInicio && <GeoJSON color="green" data={futureInicio}/>}
          {futureBreak && <GeoJSON color="green" data={futureBreak} />}

          {pastInicio && <GeoJSON color="red" data={pastInicio} />}
          {pastBreak && <GeoJSON color="red" data={pastBreak} />}

          {/* {solar && <GeoJSON color="blue" data={solar} />} */}

        </Map>
      </div>
      <Config />
      <div className="legenda">
        <div className="item">
          <p id="passado">Passado:</p>
          <img id="red-line" src={red_line} alt="linha vermelha"/>
        </div>
        <div className="item">
          <p id="futuro">Futuro: </p>
          <img id="red-line" src={green_line} alt="linha vermelha"/>
        </div>
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
