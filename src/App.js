import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";
import { SET_AUTHENTICATED } from "./Redux/types";
import { logoutUser, getUserData } from "./Redux/actions/userActions";
//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
import settings from "./pages/settings";

//Components
import Navbar from "./Components/layout/Navbar";
import Verification from "./Components/layout/Verification";
import AuthRoute from "./util/AuthRoute";
import axios from "axios";
import donate from "./pages/donate";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
  "http://localhost:5000/socialape-21bc0/us-central1/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Verification />
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <AuthRoute exact path="/settings" component={settings} />
                <Route exact path="/users/:handle" component={user} />
                <Route exact path="/donate" component={donate} />
                <Route
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
