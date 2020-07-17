import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, autheticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      autheticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  autheticated: state.user.autheticated,
});

AuthRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(AuthRoute);
