import React, { useState } from 'react';

import ISS from '../../assets/iss_countries.jpeg';

import './styles.css';

function Pesquisa() {
  const [userLocation, setUserLocation] = useState();

  useState(()=> {
    const positions = navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setUserLocation([latitude, longitude]);
    });

  }, []);

  return (
    <div className="pesquisar-content">
      <div className="pesquisar-container">
        <div className="pesquisar-logo">
          <img src={ISS} alt="iss logo"/>
          <h2>Pesquisar passagem</h2>
          <p>Ative a localização no seu navegador para poder usar esse recurso</p>
        </div>
        {!userLocation && <h1>Aguardando localização . . . </h1> }
      </div>
    </div>
  );
}

export default Pesquisa;