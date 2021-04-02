import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/logIn";
import Signup from "./components/signUp";
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/">
          <Home />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
