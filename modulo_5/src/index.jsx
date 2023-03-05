import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import { App } from './App';
import { Abc } from './templates/Abc';
import { Page404 } from './templates/Page404';
import { Menu } from './components/Menu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <Switch>
        {/* Quanto mais específica a rota, mais acima ela deve ficar, caso não esteja usando a flag exact */}
        <Route path="/abc/:slug?/:id?" component={Abc} />
        <Route path="/abc/:slug?" component={Abc} />
        <Route path="/abc" component={Abc} />
        <Route path="/" component={App} exact />
        <Route path="*" component={Page404} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
);
