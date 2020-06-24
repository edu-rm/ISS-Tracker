import React, { createContext, useState } from 'react';


export const HeaderContext = createContext();

export function HeaderContextProvider({ children }) {
  const [hide , setHide ] = useState(false);

  function dispatch(action){
    switch (action.type) {
      case '@Header/Esconder' :
        setHide(true);
        break;
      case '@Header/Mostrar' :
        setHide(false);
        break;
      default :
        setHide(false);
        break;
    }
  }


  return (
    <HeaderContext.Provider
      value={{
        hide,
        dispatch
      }}
    >
      { children }
    </HeaderContext.Provider>
  );
}

