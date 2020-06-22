import React from 'react';
import { Route } from 'react-router-dom';

import Inicio from '../Pages/Inicio';
import Sobre from '../Pages/Sobre';
import Pesquisa from '../Pages/Pesquisa';



function Routes() {
  return (
    <>
      <Route path='/' exact component={Inicio} />
      <Route path='/sobre' component={Sobre} />
      <Route path='/pesquisar' component={Pesquisa} />
    </>
  );
}

export default Routes;
