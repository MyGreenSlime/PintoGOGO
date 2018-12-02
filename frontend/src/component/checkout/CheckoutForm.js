import React, { Component } from "react";
import { getProfile, addPayment, getBills } from "../api/api";
import { CardElement, injectStripe } from "react-stripe-elements";
import "../checkout/checkout.css";
import "../checkout/enjoy.css";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { currentOrder } from "../../actions/authActions";
import Progress from "../progressbar/progressbar";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentUser: null,
      bill: null,
      alert: null,
      status: false,
      waiting: false
    };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    ev.preventDefault();
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    if (token === undefined) {
      this.setState({
        alert: (
          <div className="alert alert-danger" role="alert">
            {" "}
            Invalid Card Number!{" "}
          </div>
        )
      });
    } else {
      var data = {
        token_id: token.id
      };
      this.setState({
        waiting: true
      });
      const add_payment = addPayment.bind(this, data, "status", "waiting");
      add_payment();
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    const get_bill = getBills.bind(this, "bill");
    get_bill().then(() => {
      if (this.state.bill === null) {
        this.props.history.push("/cart");
      } else if (this.state.bill.destination === null) {
        this.props.history.push("/bill");
      }
      const get_user = getProfile.bind(this, "currentUser", "isLoaded");
      get_user();
    });
  }

  render() {
    if (!!!this.state.isLoaded) {
      return <React.Fragment />;
    }

    if (this.state.status)
      return (
        <React.Fragment>
          <div className="set-screen-enjoy">
            <div className="enjoy__container ">
              <img src="img/login/icon.png" width="20%" alt="login" />
              <div>Enjoy your food...</div>
            </div>
            <div>
              <h4>
                Please keep your order id
                <br />
                Your order id: {this.state.bill._id}
              </h4>
            </div>
            <br />
            <a href="/">
              <button
                className="btn button--confirm"
                onClick={this.confirmButtonClicked}
              >
                Back To Home
              </button>
            </a>
          </div>
        </React.Fragment>
      );
    else if (this.state.waiting) {
      return (
        <div className="enjoy__container set-screen-enjoy">
          <img src="img/login/icon.png" width="20%" alt="login" />
          <div>Please waiting..</div>
        </div>
      );
    }
    const { currentUser } = this.state;
    return (
      <div className="outer__container">
        <Progress />
        <div className=" card payment__box__container">
          <br />
          {this.state.alert}
          <strong>PAYMENT DETAIL </strong>

          <br />
          <div className="row icons">
            <div className="col-md-4 col-2" />
            <i
              className="fa fa-cc-visa fa-2x col-md-1 col-2"
              aria-hidden="true"
            />
            <i
              className="fa fa-cc-mastercard fa-2x col-md-1 col-2"
              aria-hidden="true"
            />
            <i
              className="fa fa-cc-discover fa-2x col-md-1 col-2"
              aria-hidden="true"
            />
            <i
              className="fa fa-cc-amex fa-2x col-md-1 col-2"
              aria-hidden="true"
            />
          </div>
          <hr />
          <div>
            <div>
              <div className="visa-checkout center checkout">
                <CardElement />
              </div>
              <div className="row">
                <div className=" col-6 payment__customer__detail--left">
                  Customer name
                </div>
                <div className="col-6">
                  <p>
                    {currentUser.first_name} {currentUser.last_name}
                  </p>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6 payment__customer__detail--left">
                  TOTAL PRICE
                </div>
                <div className="col-6">{this.state.bill.total_cost}</div>
              </div>
              <br />
              <div className="row">
                <div className="col-6 payment__customer__detail--left">
                  ADDRESS
                </div>
                <div className="col-6">{this.state.bill.destination}</div>
              </div>
            </div>
          </div>
          <div
            className="btn button--pay button--confirm"
            onClick={this.submit}
          >
            Pay
          </div>
        </div>
      </div>
    );
  }
}
CheckoutForm.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  currentOrder: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  order: state.order
});

export default connect(
  mapStateToProps,
  { currentOrder }
)(withRouter(injectStripe(CheckoutForm)));
