import React, { useContext, useReducer, createContext } from 'react';

const initial_state = {
  papel: true,
  dark: false,
  normal: false,
}

function reducer(theme, action) {
  switch (action.type) {
    case '@Theme/Papel' : {
      return {
        papel: true,
        dark: false,
        normal: false,
      }
    }
    case '@Theme/Dark' : {
      return {
        papel: false,
        dark: true,
        normal: false,
      }
    }
    case '@Theme/Normal' : { 
      return {
        papel: false,
        dark: false,
        normal: true,
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
