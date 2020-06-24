import React, { useContext, useEffect } from 'react';


import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ISS from '../../assets/iss_countries.jpeg';
import Countries from '../../assets/countries.svg';
import Desenvolvedor from '../../assets/desenvolvedor.jpeg';

import { HeaderContext } from '../../hooks/HeaderContext';

import './styles.css';

function Sobre() {
  const { hide } = useContext(HeaderContext);

  useEffect(() => {
    const elemento = document.querySelectorAll('.sobre-container');

    if(hide) {
      elemento[0].id = 'full-width';
    }else {
      elemento[0].id = 'normal-width';
    }
  }, [hide]);
  
  return (
    <div id="normal-width" className="sobre-container">
      <div className="sobre-content">
        <div className="logo">
          <img src={ISS} alt="iss logo"/>
          <p>Track the</p>
          <h2>ISS</h2>
        </div>
        <div className="sobre-info">
          <h2>International Space Station</h2>
          <p>
            A estação espacial internacional começou a ser montada no ano 1998 e terminou 
            oficialmente dia 8 de julho de 2011, é um laboratório completo que foi destinado a dar
            suporte a experimentos em ambiente de microgravidade e monitorar a Terra. Atualmente
            o seu principal objetivo é fornecer apoio a viagens espaciais cada vez mais longas.
          </p>
          <h3>Países envolvidos</h3>
          <img src={Countries} alt="paises"/>
        </div>
        <h2>Ajude contribuindo com esse projeto:</h2>
        <div className="github">
          <a href="https://github.com/edu-rm/ISS-Tracker" target="blank">
            <FaGithub size={90}/>
          </a>
        </div>
        <h2>Desenvolvedor</h2>
        <div className="sobre-desenvolvimento">
          <div className="desenvolvedor">
            <img src={Desenvolvedor} alt="Eduardo Rampon Meireles"/>
            <div className="media">
              <p>Eduardo Rampon Meireles</p>
              <div className="social-media">
                <a target="blank" href="https://github.com/edu-rm">
                  <FaGithub size={35}/>
                </a>
                <a target="blank" href="https://www.linkedin.com/in/eduardo-rampon-meireles-858548149/">
                  <FaLinkedin size={35} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;