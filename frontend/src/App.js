import React, { useState, useCallback } from "react";
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
import Create from "./components/views/create";
import Posts from "./components/views/Posts";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { AuthContext } from "./components/context/auth-context";

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null)
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
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
          <Create />
        </Route>

        <Route path="/posts">
          <Posts />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
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
        {/* <Redirect to="/signup" /> */}
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <NavBar />
            <main>{routes}</main>
            <Footer />
          </Layout>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
