import React from 'react';
// import { Link } from 'react-router-dom';
import './styles.css';
import ISS from '../../assets/iss_countries.jpeg';

function Header() {

  return (
    <div className="container-header">
      <div className="content-header">
        <div className="logo">
          <img src={ISS} alt="iss logo"/>
          <h2>ISS</h2>
          <p>Tracker</p>
        </div>
        <ul>
          <li className='active'>
            <a href='/'>Live</a>
          </li>
          <li>
            <a href='/sobre'>Sobre</a>
          </li>
          <li>
            <a href='/pesquisar'>Pesquisar</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
