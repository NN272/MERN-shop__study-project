import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import App from "./components/App/App";
import NotFound from "./components/App/NotFound";

import Home from "./components/Home/Home";
import HelloWorld from "./components/HelloWorld/HelloWorld";
import {Provider} from 'react-redux';
import "./styles/styles.scss";
import ReactDOM from 'react-dom';
import store from './redux/redux-store.js';

let rerenderEntireTree = (state) => {
  ReactDOM.render(
      <Router>
        <Provider store={store}>
          <App>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/helloworld" component={HelloWorld} />
              <Route component={NotFound} />
            </Switch>
          </App>
        </Provider>
      </Router>, document.getElementById("app"));
}

rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});
