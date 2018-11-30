import React, {Component} from 'react';
import {getProfile} from "../api/api";
import {CardElement,
    StripeProvider,
    Elements,
    injectStripe,} from 'react-stripe-elements';
import axios from 'axios'
import "../checkout/checkout.css"
import "../checkout/enjoy.css"
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Progress from '../progressbar/progressbar'
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentUser: null,
      bill: null,
      alert : null,
        status : false,
        waiting : false
    }
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
      console.log("token", token);
        this.setState({
            waiting: true
        })
      // console.log("id",data.token_id)
      axios.post("/api/payment/charge", data).then(res => {
        console.log(res);
        if (res.data.ok === 1) {
          this.setState({
            status: true,
            waiting: false
          });
        }
      });
  }
}

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
          }
        axios.get("api/bills/current")
        .then(res => {
            this.setState({
                bill: res.data
            });
        })
        .then(() => {
            if(this.state.bill === null) {
                this.props.history.push("/cart");
            }
            else if(this.state.bill.destination === null){
                this.props.history.push("/bill")
            }
            const get_user = getProfile.bind(this, "currentUser", "isLoaded");
            get_user();
        })
        .then(() => {
            //console.log("whole bill: ", this.state.bill);
            //console.log("order: ", this.state.bill.order);
        });
    }

  render() {
    if (!!!this.state.isLoaded) {
        return <React.Fragment />;
      }
      {
        console.log("....", this.state.currentUser);
      }
    if (this.state.status) return (
        <React.Fragment>
            <div className="set-screen-enjoy">
            <div className="enjoy__container ">
                <img src="img/login/icon.png" width="20%"/>
                <div>Enjoy your food...</div>
            </div>
            <div>
                <h4>
                Please keep your order id
                <br/>
                Your order id: {this.state.bill._id}
                    </h4>
            </div>
            <br/>
            <a href="/">
                <button
                className="btn button--confirm"
                onClick={this.confirmButtonClicked}>
                Back To Home
                </button>
            </a>
            </div>
        </React.Fragment>

    );
    else if (this.state.waiting) {
        return (
            <div className="enjoy__container set-screen-enjoy">
                <img src="img/login/icon.png" width="20%"/>
                <div>Please waiting..</div>
            </div>
        );
      }
    const { currentUser } = this.state;
    return (
    <div className="outer__container">
        <Progress/>
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
            <div>
                {/* <div className="col-md-6 col-12 payment__purchase--pad">
                    <div className="checkout">
                        <CardElement />
                    </div>
                </div> */}
                
                <div>
                        <div className="visa-checkout center checkout">
                            <CardElement />
                        </div>
                    <div className="row">
                        <div className=" col-6 payment__customer__detail--left">
                            Customer name
                        </div>
                        <div className="col-6">
                            <p>{currentUser.first_name} {currentUser.last_name}</p>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6 payment__customer__detail--left">
                            TOTAL PRICE
                        </div>
                        <div className="col-6">
                            {this.state.bill.total_cost}
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6 payment__customer__detail--left">
                            ADDRESS
                        </div>
                        <div className="col-6">
                            {this.state.bill.destination}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="btn button--confirm"> */}
              <div className="btn button--pay button--confirm" onClick={this.submit}>Pay</div>
        </div>
    </div>
      
    );
  }
}
CheckoutForm.propTypes = {
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps
  )(withRouter(injectStripe(CheckoutForm)));
