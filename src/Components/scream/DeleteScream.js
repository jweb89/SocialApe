import React, { Component, Fragment } from "react";
import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import PropTypes from "prop-types";

//MUI Stuff
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { connect } from "react-redux";
import { deleteScream } from "../../Redux/actions/dataActions";
import MyButton from "../../util/MyButton";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
};

class DeleteScream extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Scream"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary"></DeleteOutline>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullwidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this scream?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);
