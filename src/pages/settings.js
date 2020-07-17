import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//MUI Stuff
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  CircularProgress,
  Button,
} from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadThis,
});

export class settings extends Component {
  state = {
    email: "",
    phone: "",
    handle: "",
    newPassword: "",
    confirmNewPassword: "",
    errors: {},
    loading: true,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      email: credentials.email || "",
      phone: credentials.phone || "",
      handle: credentials.handle || "",
    });
    console.log(credentials);
  };

  componentWillReceiveProps(nextprops) {
    const { credentials } = nextprops.user;
    this.mapUserDetailsToState(credentials);
  }

  componentWillMount() {
    const { credentials } = this.props.user;
    this.mapUserDetailsToState(credentials);
  }

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const errors = this.state.errors;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h3" className={classes.pageTitle}>
            Settings
          </Typography>
          <form action="" noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="phone"
              name="phone"
              type="text"
              label="Phone"
              className={classes.textField}
              helperText={errors.phone}
              error={errors.phone ? true : false}
              value={this.state.phone}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="newPassword"
              name="newPassword"
              type="password"
              label="New Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              label="Confirm New Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customeError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Update
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

settings.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(settings));
