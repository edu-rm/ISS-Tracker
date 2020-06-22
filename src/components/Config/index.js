import React, { useState } from 'react';
import { FaCog, FaCogs } from 'react-icons/fa';

import './styles.css';

function Config() {
  // const [showId, setShowId] = useState();
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
            <select name="temas" id="tema">
              <option value="draft">Papelão</option>
              <option value="dark">Dark</option>
            </select>
          </div>

        </div>
  
      </div>
    </div>
  );
}

export default Config;