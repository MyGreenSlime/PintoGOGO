import React, {Component} from 'react';
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
            status : false
        
        };
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
                    this.setState({status: true});
                }
            })
    }

    render() {
        if (this.state.status) return <h1>Purchase Complete</h1>;
        return (
            <div className="row">
                <div className="col-4">
                </div>
                <div className="col-4">
                    <div className="checkout">
                        <p>Would you like to complete the purchase?</p>
                        <CardElement />
                        <button onClick={this.submit}>Pay</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default injectStripe(CheckoutForm);