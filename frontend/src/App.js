import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/logIn";
import Signup from "./components/signUp";
import Home from "./components/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/footer/footer";
import Layout from "./components/Layout/Layout";
import Create from './components/views/create';
import Posts from './components/views/PostCard';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <NavBar />
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

            <Route path="/create">
              <Create/>
            </Route>

            <Route path="/posts">
              <Posts/>
            </Route>

            <Redirect to="/" />
          </Switch>
          <Footer />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
