import React, {Component} from 'react';
import {getProfile} from "../api/api";
import {CardElement,
    StripeProvider,
    Elements,
    injectStripe,} from 'react-stripe-elements';
import axios from 'axios'
import "../checkout/checkout.css"
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoaded: false,
        currentUser: null,
        bill: null
    }
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    ev.preventDefault();
    let {token} = await this.props.stripe.createToken({name: "Name"});
    var data = {
        token_id : token.id
    }
    axios.post("/api/payment/charge", data)
        .then((res) => {
            console.log(res)
            if (res.data.ok == 1) {
                this.setState({
                    status: true
                });
            }
        })
    }

    componentDidMount() {
        axios.get("api/bills/current")
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
        })
    }

  render() {
    if (!!!this.state.isLoaded) {
        return <React.Fragment />;
      }
      {
        console.log("....", this.state.currentUser);
      }
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    const { currentUser } = this.state;
    return (
        
        <div className=" card payment__box__container">
            <strong>PAYMENT DETAIL  </strong>
            
            <br/>
            <div class="row icons">
                <div className="col-md-4 col-2" />
                <i className="fa fa-cc-visa fa-2x col-md-1 col-2" aria-hidden="true"></i>
                <i className="fa fa-cc-mastercard fa-2x col-md-1 col-2" aria-hidden="true"></i>
                <i className="fa fa-cc-discover fa-2x col-md-1 col-2" aria-hidden="true"></i>
                <i className="fa fa-cc-amex fa-2x col-md-1 col-2" aria-hidden="true"></i>
            </div>
            <hr />
            <div className="row ">
                <div className="col-6 payment__purchase--pad">
                    <div className="checkout">
                        {/* <p>Would you like to complete the purchase?</p> */}
                        <CardElement />
                        <button onClick={this.submit}>Pay</button>
                    </div>
                </div>
                
                <div className="col-6 payment__customer__detail">
                    <div className="row">
                        <div className="col-6 payment__customer__detail--left">
                            CUSTOMER NAME
                        </div>
                        <div className="col-6">
                            {currentUser.first_name}
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6 payment__customer__detail--left">
                            TOTAL PRICE
                        </div>
                        <div className="col-6">
                            {this.state.bill.order_cost}
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6 payment__customer__detail--left">
                            ADDRESS
                        </div>
                    </div>
                </div>
                
            </div>
            <a href="/">
                <button
                className="btn button--confirm"
                onClick={this.confirmButtonClicked}>
                CONFIRM PAYMENT
                </button>
            </a>
        </div>
        
      
    );
  }
}
export default injectStripe(CheckoutForm);