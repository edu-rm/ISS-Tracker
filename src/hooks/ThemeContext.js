import React, { useContext, useReducer, createContext } from 'react';

const initial_state = {
  papel: true,
  dark: false,
  normal: false,
  fire: false,
  satelite: true,
}

function reducer(theme, action) {
  switch (action.type) {
    case '@Theme/Papel' : {
      return {
        papel: true,
        dark: false,
        normal: false,
        fire: true,
        satelite: false,
      }
    }
    case '@Theme/Dark' : {
      return {
        papel: false,
        dark: true,
        normal: false,
        fire: false,
        satelite: false,
      }
    }
    case '@Theme/Fire' : {
      return {
        papel: false,
        dark: false,
        normal: false,
        fire: true,
        satelite: false,
      }
    }
    case '@Theme/Satelite' : { 
      return {
        papel: false,
        dark: false,
        normal: false,
        fire: false,
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
