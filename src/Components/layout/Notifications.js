import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

//MUI Stuff
import {
  MenuItem,
  Menu,
  Tooltip,
  Typography,
  Badge,
  IconButton,
} from "@material-ui/core";
import { Favorite, Chat } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";

//Redux Stuff
import { connect } from "react-redux";
import { markNotificationsRead } from "../../Redux/actions/userActions";

class Notifications extends Component {
  state = {
    anchorE1: null,
  };

  handleOpen = (event) => {
    this.setState({ anchorE1: event.target });
  };

  handleClose = () => {
    this.setState({ anchorE1: null });
  };

  onMenuOpened = () => {
    let unreadNotificationsId = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationsId);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorE1 = this.state.anchorE1;

    dayjs.extend(relativeTime);

    let notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notificationIcon = (
            <Badge
              badgeContent={
                notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationIcon = <NotificationsIcon />);
    } else {
      notificationIcon = <NotificationsIcon />;
    }

    let notificationsMarkUp =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === "like" ? "liked" : "commented on";
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? "primary" : "secondary";
          const icon =
            not.type === "like" ? (
              <Favorite color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <Chat color={iconColor} style={{ marginRight: 20 }} />
            );
          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="textPrimary"
                variant="body1"
                to={`/users/${not.recipient}/scream/${not.screamId}`}
              >
                {not.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );

    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorE1 ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorE1}
          open={Boolean(anchorE1)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkUp}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
