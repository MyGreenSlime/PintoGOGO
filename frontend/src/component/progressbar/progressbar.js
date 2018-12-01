import React, { Component } from "react";
import './style-progress.css'

class Progress extends Component {
  render() {
    return (
      <div className="grid-menubar cart__menubar center">
        {/* <div className="col" /> */}
        <div>
            <img src="/img/cart/plan.png" alt="plan icon" width="50%" />
          <p>PLAN</p>
        </div>
        <div>
          <img
            src="/img/cart/arrow.png"
            alt="arrow icon"
            width="20%"
          />
        </div>

        <div>
            <img src="/img/cart/cart.png" alt="cart icon" width="50%" />
          <p>CART</p>
        </div>
        <div>
          <img
            src="/img/cart/arrow.png"
            alt="arrow icon"
            width="20%"
          />
        </div>
        <div>
          <img src="/img/cart/payment.png" alt="payment icon" width="50%" />
          <p>BILL</p>
        </div>
        <div>
          <img
            src="/img/cart/arrow.png"
            alt="arrow icon"
            width="20%"
          />
        </div>
        <div>
          <img src="/img/cart/delivery.png" alt="delivery icon" width="50%" />
          <p>PAY</p>
        </div>
        <div>
          <img
            src="/img/cart/arrow.png"
            alt="arrow icon"
            width="20%"
          />
        </div>
        <div>
          <img src="/img/cart/enjoy.png" alt="enjoy icon" width="50%" />
          <p>ENJOY</p>
        </div>
        {/* <div className="col" /> */}
      </div>
    );
  }
}

export default Progress;
