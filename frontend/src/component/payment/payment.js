import React, { Component } from "react";
import "../payment/style-payment.css";

export default class Payment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="box__content">
            <div class="card card-form card__payment">
              <div class="card-body">
                <h2 className="txt__title">Order Summary</h2>
                <p>Choose Address</p>

                <div class="dropdown box__addr">
                  <button
                    class="btn btn-block dropdown-toggle dd__addr"
                    type="button"
                    data-toggle="dropdown"
                  >
                    Selected
                  </button>
                  <div class="dropdown-menu btn-block">
                    <a class="dropdown-item" href="#">
                      Link One
                    </a>
                    <a class="dropdown-item" href="#">
                      Link Two
                    </a>
                    <a class="dropdown-item" href="#">
                      Link Three
                    </a>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <p>food cost</p>
                  </div>
                  <div className="col col--right">
                    <p>baht</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Distance</p>
                  </div>
                  <div className="col col--right">
                    <p>kilometer</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Delivery Fee</p>
                  </div>
                  <div className="col col--right">
                    <p>baht</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Promo Code</p>
                  </div>
                  <div className="col col--right">
                    <input type="text" class="form-control form-control-lg" />
                  </div>
                </div>
                <div className="row txt__total">
                  <div className="col">
                    <p>Order Total</p>
                  </div>
                  <div className="col col--right">
                    <p>baht</p>
                  </div>
                </div>
                <div className="row box__confirm">
                  <button class="btn btn-lg button__confirm" type="button">
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
