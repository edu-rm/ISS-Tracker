/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import passApi from '../../services/passApi'

import ISS from '../../assets/iss_countries.jpeg';

import './styles.css';

function Pesquisa() {
  const [userLatitude, setUserLatitude] = useState();
  const [userLongitude, setUserLongitude] = useState();
  const [loadingPosition, setLoadingPosition] = useState(true);
  const [passes, setPasses] = useState([]);

  const [celular, setCelular] = useState(false);

  useEffect(()=> {
    if(!(navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    )){
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLatitude(latitude);
        setUserLongitude(longitude);
      });
    }else {
      setCelular(true);
    }

  },[]);

  useEffect(()=>{
    try{

      passApi.get('iss-pass.json', {
        params :{
          lat: userLatitude,
          lon: userLongitude
        }
      }).then(response => {
        
        // console.log();
        setPasses(response.data.response);
      });
        
    } catch (e) {
      console.log(e);
    }
  },[userLatitude, userLongitude]);

  return (
    <div className="pesquisar-content">
      <div className="pesquisar-container">
        <div className="pesquisar-logo">
          <img src={ISS} alt="iss logo"/>
          <h2>Pesquisar passagem</h2>
          <p>Ative a localização no seu navegador para poder usar esse recurso</p>
        </div>
        {celular && !userLatitude && (<h1>Aparecerá o formulario </h1> )}
        {userLatitude && (
          <div className="table">
            <div className="table-header">
              <p>Momento</p>
              <p>Duração</p>
            </div>
            {passes.map(pass => (
              <div className="table-data">
                <p>{pass.risetime}</p>
                <p>{pass.duration}</p>
              </div>
            ))

            }

          </div>
        )}

      </div>
    </div>
  );
}

export default Pesquisa;