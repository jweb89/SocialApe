import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import icon from "../images/icon.png";
import { Link } from "react-router-dom";
//Mui Stuff
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core";
//Redux Stuff
import { connect } from "react-redux";
import { signupUser } from "../Redux/actions/userActions";

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

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      phone: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    console.log(nextProps.UI.errors);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
      phone: this.state.phone,
    };
    this.props.signupUser(newUserData, this.props.history);
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
            Signup
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
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
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account? login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
