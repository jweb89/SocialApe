import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import icon from "../images/icon.png";
import { Link } from "react-router-dom";
//Mui Stuff
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core";
//Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../Redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  // form: {
  //   textAlign: "center",
  // },
  // image: {
  //   margin: "20px auto 20px auto",
  // },
  // pageTitle: {
  //   margin: "10px auto 10px auto",
  // },
  // textField: {
  //   margin: "10px auto",
  // },
  // button: {
  //   marginTop: 20,
  //   position: "relative",
  // },
  // customeError: {
  //   color: "red",
  //   fontSize: ".8rem",
  //   marginTop: 10,
  // },
  // progress: {
  //   position: "absolute",
  //   alignSelf: "center",
  // },
});

export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img
            src={icon}
            alt="ape"
            width={100}
            height={100}
            className={classes.image}
          />
          <Typography variant="h3" className={classes.pageTitle}>
            Login
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
              id="password"
              name="password"
              type="password"
              label="Password"
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
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Don't have an account? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
