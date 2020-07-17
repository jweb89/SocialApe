import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import { verifyPhone, resendCode } from "../../Redux/actions/userActions";

import { clearErrors } from "../../Redux/actions/dataActions";

import {
  Typography,
  Button,
  withStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.spreadThis,
  Button: {
    color: "white",
  },

  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
  resendCode: {
    position: "relative",
    marginTop: "20px",
    marginRight: "3px",
    float: "right",
  },
  submitButton: {
    position: "relative",
    marginTop: "20px",
    float: "right",
  },
});

export class Verification extends Component {
  state = {
    open: false,
    enteredCode: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ enteredCode: "", errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.verifyPhone({
      enteredCode: this.state.enteredCode,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
    this.props.clearErrors();
  };

  handleResend = (event) => {
    event.preventDefault();
    this.props.resendCode();
  };

  render() {
    const { errors } = this.state;

    const {
      classes,
      user: { authenticated, isVerified },
      UI: { loading },
    } = this.props;

    return authenticated && !isVerified ? (
      <Fragment>
        <hr className={classes.invisibleSeparator} />
        <Typography align="center">
          Your phone number needs to be verified{"  "}
          <Button variant="contained" size="small" onClick={this.handleOpen}>
            Verify <VerifiedUser />
          </Button>
        </Typography>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon></CloseIcon>
          </MyButton>
          <DialogTitle>Enter Verification Code</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="enteredCode"
                type="text"
                label="Code"
                placeholder="000000"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.resendCode}
              onClick={this.handleResend}
              disabled={loading}
            >
              Resend Code
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </DialogContent>
        </Dialog>
      </Fragment>
    ) : null;
  }
}

Verification.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, {
  verifyPhone,
  resendCode,
  clearErrors,
})(withStyles(styles)(Verification));
