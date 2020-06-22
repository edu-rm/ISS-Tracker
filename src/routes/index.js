import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from '../Pages/Inicio';
import Sobre from '../Pages/Sobre';
import Pesquisa from '../Pages/Pesquisa';



function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Inicio} />
        <Route path='/sobre' component={Sobre} />
        <Route path='/pesquisar' component={Pesquisa} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
