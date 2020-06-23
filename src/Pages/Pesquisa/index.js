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
        const fortmatted = response.data.response.map(data=> {
          // Formatando data
          let data_passagem = new Date(data.risetime*1000);
          data_passagem = data_passagem.toLocaleString('pt-BR');

          // Formatando minutos/ segundos

          const segundos_decimal =(data.duration/60) - Math.trunc(data.duration/60) ;
          console.log(segundos_decimal)
          const segundos_formatado = Math.trunc(segundos_decimal*60);

          const minutos = Math.trunc(data.duration/60);

          // const durationFormatted = (Math.trunc(data.duration/60) + minutos).toFixed(2);

          return {
            ...data,
            risetimeFormatted: data_passagem,
            durationFormatted: {
              minutes: minutos,
              seconds:  segundos_formatado,
            },
          }
        });

        console.log(fortmatted);

        setPasses(fortmatted);
        // console.log(passes);
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
              <p>Data e hora</p>
              <p>Duração</p>
            </div>
            {passes.map(pass => (
              <div key={pass.risetime} className="table-data">
                <p>{pass.risetimeFormatted}</p>
                <p>{`${pass.durationFormatted.minutes} m ${pass.durationFormatted.seconds} s`}</p>
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