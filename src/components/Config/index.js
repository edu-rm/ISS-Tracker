import React, { useState, useContext } from 'react';
import { FaCogs } from 'react-icons/fa';

import { ThemeContext } from '../../hooks/ThemeContext';

import './styles.css';


function Config() {
  const { dispatch } = useContext(ThemeContext);
  // const [showId, setShowId] = useState();

  function handleThemeOptionChange(e){
    console.log(`@Theme/${e.target.value}`);
    dispatch({
        type: `@Theme/${e.target.value}`,
    });
  }

  function handleMouseOver(){
    const elemento = document.querySelectorAll('.config-items');
    elemento[0].id = "mostrar";
  }

  function handleMouseOut(){
    const elemento = document.querySelectorAll('.config-items');
    elemento[0].id = "invisivel";
  }

  return (
    <div className="container-config" >
      <div className="config-menu">

        <button id="config" onMouseOver={handleMouseOver} type="button">
          <FaCogs size={20} color="red"/>
        </button>


        <div className="config-items" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} id="invisivel">
          
          <div className="config-item">
            <label htmlFor="temas">Tema:</label>
            <select name="temas" id="tema" onChange={handleThemeOptionChange}>
              <option value="Papel">Papel</option>
              <option value="Dark">Dark</option>
              <option value="Pretobranco">Preto e Branco</option>
              <option value="Satelite">Satélite</option>
            </select>
          </div>

        </div>
  
      </div>
    </div>
  );
}

export default Config;