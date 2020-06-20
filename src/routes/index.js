import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from '../Pages/Inicio';
import Sobre from '../Pages/Sobre';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Inicio} />
        <Route path='/sobre' component={Sobre} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
