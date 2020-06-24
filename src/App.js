import React from 'react';

import Routes from './routes';
import { BrowserRouter, Switch } from 'react-router-dom';

import {ContextProvider} from './hooks/ThemeContext';
import { HeaderContextProvider } from './hooks/HeaderContext';



import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <HeaderContextProvider>
        <Header />
        <Switch>
          <ContextProvider>
              <Routes />
          </ContextProvider>
        </Switch>
      </HeaderContextProvider>
    </BrowserRouter>
  );
}

export default App;
