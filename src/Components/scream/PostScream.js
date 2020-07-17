import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import MyButton from "../../util/MyButton";

import { connect } from "react-redux";
import { postScream, clearErrors } from "../../Redux/actions/dataActions";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    marginTop: "20px",
    float: "right",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
      user: { isVerified },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Scream!">
          <AddIcon></AddIcon>
        </MyButton>
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
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            {!isVerified ? (
              <p>You must first verify your account</p>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="body"
                  type="text"
                  label="SCREAM!!!"
                  multiline
                  rows="3"
                  placeholder="Scream at your fellow apes"
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
            )}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
