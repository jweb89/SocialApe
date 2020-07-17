import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";
import Verification from "./Verification";
import { logoutUser } from "../../Redux/actions/userActions";

//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

//Icons
import HomeIcon from "@material-ui/icons/Home";
import Settings from "@material-ui/icons/Settings";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

export class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Verification />
              <Grid item>
                <PostScream></PostScream>
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon></HomeIcon>
                  </MyButton>
                </Link>
                <Notifications />
                <Link to="/settings">
                  <MyButton tip="Settings">
                    <Settings></Settings>
                  </MyButton>
                </Link>
                <MyButton tip="Logout" onClick={this.handleLogout}>
                  <KeyboardReturn color="primary" />
                </MyButton>
                <Button color="inherit" component={Link} to="/donate">
                  Donate
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/donate">
                Donate
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
