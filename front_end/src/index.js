import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import App from "./App";
import Search from "./components/Search";
import FormContainer from "./components/FormContainer";
import Header from "./components/Header";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <div>
      <Header />
      <hr />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/add" component={FormContainer} />
        <Route path="/search" component={Search} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
