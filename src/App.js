import React from 'react';

import Routes from './routes';
import { BrowserRouter, Switch } from 'react-router-dom';

import {ContextProvider} from './hooks/ThemeContext';


import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <ContextProvider>
          <Routes />
        </ContextProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
