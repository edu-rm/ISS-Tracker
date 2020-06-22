import React from 'react';

import { Link } from 'react-router-dom';
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
            <Link to='/'>Live</Link>
          </li>
          <li>
            <Link to='/sobre'>Sobre</Link>
          </li>
          <li>
            <Link to='/pesquisar'>Pesquisar</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
