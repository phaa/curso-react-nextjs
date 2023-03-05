import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import { App } from './App';
import { Abc } from './templates/Abc';
import { Menu } from './components/Menu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/abc/:slug?/:id?" component={Abc} exact />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
);
