import React, { useState, useEffect } from 'react';

import passApi from '../../services/passApi'

import ISS from '../../assets/iss_countries.jpeg';

import './styles.css';

function Pesquisa() {
  const [userLatitude, setUserLatitude] = useState();
  const [userLongitude, setUserLongitude] = useState();
  const [loadingPosition, setLoadingPosition] = useState(true);

  // useEffect(()=> {
     
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const { latitude, longitude } = position.coords;
    //   setUserLatitude(latitude);
    //   setUserLongitude(longitude);
    // });

  // },[]);

  useEffect(()=>{
    try{

      passApi.get('iss-pass.json', {
        params :{
          lat: userLatitude,
          lon: userLongitude
        }
      }).then(response => {
        console.log(response.data);
      });
        
    } catch (e) {
      console.log(e);
    }
  },[userLatitude, userLongitude])

  return (
    <div className="pesquisar-content">
      <div className="pesquisar-container">
        <div className="pesquisar-logo">
          <img src={ISS} alt="iss logo"/>
          <h2>Pesquisar passagem</h2>
          <p>Ative a localização no seu navegador para poder usar esse recurso</p>
        </div>
        {!userLatitude && <h1>Aguardando localização . . . </h1> }
        <p>{userLatitude}</p>
        <p>{userLongitude}</p>

      </div>
    </div>
  );
}

export default Pesquisa;