import React, { useReducer, createContext } from 'react';

const initial_state = {
  papel: true,
  dark: false,
  normal: false,
  satelite: true,
  preto_branco: false
}

function reducer(theme, action) {
  switch (action.type) {
    case '@Theme/Papel' : {
      return {
        papel: true,
        dark: false,
        normal: false,
        satelite: false,
        preto_branco: false
      }
    }
    case '@Theme/Dark' : {
      return {
        papel: false,
        dark: true,
        normal: false,
        fire: false,
        satelite: false,
        preto_branco: false
      }
    }
    case '@Theme/Pretobranco' : {
      return {
        papel: false,
        dark: false,
        normal: false,
        satelite: false,
        preto_branco: true
      }
    }
    case '@Theme/Satelite' : { 
      return {
        papel: false,
        dark: false,
        normal: false,
        satelite: true,
      }
    }
    default : 
      return theme;
    
  }
}

export const ThemeContext = createContext();

export function ContextProvider({ children }) {
  const [theme, dispatch] = useReducer(reducer, initial_state);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        dispatch,
      }}
    >
      { children }
    </ThemeContext.Provider>
  );
}
