import React, { Component } from "react";
import { getProfile } from "../api/api";
import {
  CardElement,
  injectStripe
} from "react-stripe-elements";
import axios from "axios";
import "../checkout/checkout.css";
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentUser: null,
      bill: null,
      alert : null,
    };
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    ev.preventDefault();
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    if (token === undefined) {
      console.log("invalid")
      this.setState({
        alert: <div class="alert alert-danger" role="alert"> Invalid Card Number! </div>
      })
    } else {
      var data = {
        token_id: token.id
      };
      window.location.href = '/enjoy'
      console.log("token", token);
      // console.log("id",data.token_id)
      axios.post("/api/payment/charge", data).then(res => {
        console.log(res);
        if (res.data.ok === 1) {
          this.setState({
            status: true
          });
        }
      });
    }
  }

  componentDidMount() {
    axios
      .get("api/bills/current")
      .then(res => {
        this.setState({
          bill: res.data
        });
      })
      .then(() => {
        const get_user = getProfile.bind(this, "currentUser", "isLoaded");
        get_user();
      })
      .then(() => {
        console.log("whole bill: ", this.state.bill);
        console.log("order: ", this.state.bill.order);
      });
  }

  render() {
    if (!!!this.state.isLoaded) {
      return <div className="loader" />;
    }
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    const { currentUser } = this.state;
    return <div className="checkout__set__bg">
        <div className=" card payment__box__container">
          <br />
          {this.state.alert}
          <strong>PAYMENT DETAIL </strong>

          <br />
          <div class="row icons">
            <div className="col-md-4 col-2" />
            <i className="fa fa-cc-visa fa-2x col-md-1 col-2" aria-hidden="true" />
            <i className="fa fa-cc-mastercard fa-2x col-md-1 col-2" aria-hidden="true" />
            <i className="fa fa-cc-discover fa-2x col-md-1 col-2" aria-hidden="true" />
            <i className="fa fa-cc-amex fa-2x col-md-1 col-2" aria-hidden="true" />
          </div>
          <hr />
          <div className="row ">
            <div className="col-md-6 col-12 payment__purchase--pad">
              <div className="checkout">
                {/* <p>Would you like to complete the purchase?</p> */}
                <CardElement />
                <div className="btn button--confirm">
                  <div onClick={this.submit}>Pay</div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12 payment__customer__detail">
              <div className="row">
                <div className="col-md-4 col-12 payment__customer__detail--left">
                  Customer name
                </div>
                <div className="col-md-8 col-12">
                  <p>
                    {currentUser.first_name} {currentUser.last_name}
                  </p>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4 col-12 payment__customer__detail--left">
                  TOTAL PRICE
                </div>
                <div className="col-md-8 col-12">
                  {this.state.bill.total_cost}
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4 col-12 payment__customer__detail--left">
                  ADDRESS
                </div>
                <div className="col-md-8 col-12">
                  {this.state.bill.destination}
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>;
  }
}
export default injectStripe(CheckoutForm);
