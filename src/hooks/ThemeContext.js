import React, { useContext, useReducer, createContext } from 'react';

const initial_state = {
  theme: 'papel'
}

function reducer(state, action) {
  switch (action.type) {
    case '@Theme/Papel' : 
      return {
        ...state,
        theme: 'papel'
      }
    
    case '@Theme/Dark' : 
      return {
        ...state,
        theme: 'dark'
      }
    
    default : 
      return state;
    
  }
}

export const ThemeContext = createContext();

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial_state);

  return (
    <ThemeContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      { children }
    </ThemeContext.Provider>
  );
}
