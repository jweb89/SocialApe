import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField, withStyles, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = (theme) => ({
  ...theme.spreadThis,
});

const CLIENT = {
  sandbox:
    "Aayg9uYlr1u-qRVm-GhD15AylEd7by7WS7OkIt4GGY2qvpNtZJOfDJnxy4WIrFcICZglh5FMjoSeBUQ9",
  production: "your_production_key",
};

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
      amount: null,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: +"SocialApe Donation",
          amount: {
            currency_code: "USD",
            value: this.state.amount,
          },
        },
      ],
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then((details) => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID,
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { showButtons, loading, paid, amount } = this.state;
    const { classes } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          {loading && <CircularProgress />}
          {!paid ? (
            <div>
              <Typography variant="h3" className={classes.pageTitle}>
                Donate
              </Typography>
              <h2>Enter amount to donate:</h2>
              <TextField
                id="amount"
                name="amount"
                type="number"
                label="Donation Amount"
                placeholder="5000"
                className={classes.form}
                onChange={this.handleChange}
                fullWidth
              />
            </div>
          ) : null}
          {showButtons && amount ? (
            <div>
              <br />
              <PayPalButton
                createOrder={(data, actions) => this.createOrder(data, actions)}
                onApprove={(data, actions) => this.onApprove(data, actions)}
              />
            </div>
          ) : null}

          {paid && (
            <div className="main">
              <h2>
                Thanks for your donation!{" "}
                <span role="img" aria-label="emoji">
                  {" "}
                  😉
                </span>
              </h2>
            </div>
          )}
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

PaypalButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(
    PaypalButton
  )
);
