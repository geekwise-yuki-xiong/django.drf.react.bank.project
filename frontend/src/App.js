// frontend/src/App.js
import React, { Component } from "react";

import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import Models from "./components/Models";
import PrivateRoute from "./components/common/PrivateRoute";
import axios from "axios";

import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

import { Provider } from 'react-redux';
import store from "./store";

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <h4 className="text-right text-white">
            <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </h4>
          <Switch>
            <Route exact path="/" component={Models}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;