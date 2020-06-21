import React from 'react';
// import { Link } from 'react-router-dom';
import './styles.css';
import ISS from '../../assets/iss.png';

function Header() {

  return (
    <div className="container-header">
      <div className="content-header">
        <ul>
          <div className="logo">
            <img src={ISS} alt="iss logo"/>
            <h2>ISS</h2>
          </div>
          <li className='active'>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/sobre'>Sobre</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
