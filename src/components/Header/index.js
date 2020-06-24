import React, {useState, useContext} from 'react';

import { Link } from 'react-router-dom';
import { HeaderContext } from '../../hooks/HeaderContext';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import './styles.css';
import ISS from '../../assets/iss_countries.jpeg';



function Header() {
  const { hide, dispatch } = useContext(HeaderContext);

  function handleOnClickHide(){
    const elemento = document.querySelectorAll('.container-header');
    elemento[0].id = 'sumir';
    dispatch({
      type: '@Header/Esconder'
    });
  }

  function handleOnClickShow(){
    const elemento = document.querySelectorAll('.container-header');
    elemento[0].id = 'aparecer';
    dispatch({
      type: '@Header/Mostrar'
    });
  }

  return (
    <>
      <div className="container-header">
        {
          hide ?
          <button onClick={handleOnClickShow} className="header-show" type="button">
            <FaArrowRight color="red" size={24}/>
          </button>
          :
          <button onClick={handleOnClickHide} className="header-show" type="button">
            <FaArrowLeft color="red" size={24}/>
          </button>
        }
        
        <div className="content-header">
          <div className="logo">
            <img src={ISS} alt="iss logo"/>
            <p>Track the</p>
            <h2>ISS</h2>
          </div>
          <ul>
            <li className='active'>
              <Link to='/'>Live</Link>
            </li>
            {/* <li>
              <Link to='/pesquisar'>Pesquisar</Link>
            </li> */}
            <li>
              <Link to='/sobre'>Sobre</Link>
            </li> 
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
