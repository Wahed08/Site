import React, { useState, useCallback, useEffect } from "react";
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
import FetchUser from './components/account/fetchUser';
import UpdatePost from './components/views/UpdatePost';
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
    button: {
      textTransform: 'none'
    }
  },
});

function App() {

  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);

    localStorage.setItem(
      'Data',
      JSON.stringify({ userId: uid, token: token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null)
    localStorage.removeItem('Data');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('Data'));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  let routes;

  if (token) {
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

        <Route path="/post/create">
          <Create />
        </Route>

        <Route path="/post/:postId/update">
          <UpdatePost />
        </Route>

        <Route path="/posts">
          <Posts />
        </Route>

        <Route path="/:userId/account">
          <FetchUser />
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
        isLoggedIn: !!token,
        token: token,
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
