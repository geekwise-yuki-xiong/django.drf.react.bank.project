import React, { Component } from "react";

import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import Models from "./components/Models";
import PrivateRoute from "./components/common/PrivateRoute";
import Header from "./components/layout/Header";
import Reset from "./components/accounts/PassReset";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux';
import store from "./store";
import { loadUser } from './actions/auth';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
          <Router>
            <Header/>
            <Switch>
              <PrivateRoute exact path="/" component={Models}/>
              <Route exact path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/pass-reset" component={Reset}/>
            </Switch>
          </Router>
      </Provider>
    );
  }
}

export default App;