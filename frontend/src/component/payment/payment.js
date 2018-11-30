import React, { Component } from "react";
import "../payment/style-payment.css";
import "../cart/cart.css";
import axios from "axios";

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: {},
      address: "",
      distance: "",
      deliveryFee: "",
      distSelected: false,
      totalCost: "",
      isLoaded: false
    };

    this.ddDOM = React.createRef();
    this.calculateDeliveryFee = this.calculateDeliveryFee.bind(this);
    this.updateBill = this.updateBill.bind(this);
  }

  updateBill() {
    var finalOrder = {
      destination: window.txt,
      delivery_fee: this.state.deliveryFee,
      distance: this.state.distance,
      total_cost: this.state.totalCost
    }
    axios
      .put("api/bills/update/current", finalOrder)
      .then(res => {
        console.log("final!! ", this.state.bill);
        
    })
}

  componentDidMount() {
    axios
      .get("/api/bills/current")
      .then(res => {
        this.setState({
          bill: res.data
        });
      })
      .then(() => {
        console.log("whole bill: ", this.state.bill);
        console.log("order: ", this.state.bill.order);
      })
      .then(() => {
        axios
          .get("/api/address/current")
          .then(res => {
            this.setState({
              address: res.data,
              isLoaded: true
            });
          })
          .then(() => {
            console.log("address: ", this.state.address);
          });
      })
  }

  componentDidUpdate() {
    if (this.state.isLoaded) {
      const $ = window.$;
      this.ddDOM = $(this.ddDOM.current);
      this.ddDOM.dropdown();

      $(".dd__addr-choice").click(function() {
        window.txt = $(this).text();
        console.log("dd selected", window.txt);
      });
      console.log(this.ddDOM);
    }
  }

  calculateDeliveryFee(index) {
    var dist = this.state.address[index].distance;
    dist = dist / 1000;
    var fee = dist * 2;
    var packageOrder = this.state.bill.order.package_order;

    if (packageOrder != null) {
      var i,
        maxDay = 3;
      for (i = 0; i < packageOrder.length; i++) {
        if (packageOrder[i].package_id.type > maxDay) {
          maxDay = packageOrder[i].package_id.type;
        }
      }
    }
    fee = Math.floor(fee * maxDay);
    var total = Math.round(this.state.bill.order_cost + fee);

    this.setState({
      distance: dist,
      deliveryFee: fee,
      distSelected: true,
      totalCost: total
    });
  }

  render() {
    const { bill, address, isLoaded } = this.state;

    if (!!!isLoaded) {
      return <React.Fragment />;
    }
    console.log("here addr: ", address);
    console.log("here bill: ", bill);
    return (
      <React.Fragment>
        <div className="set-screen-payment">
          <div className="row cart__menubar">
            <div className="col-1" />
            <div className="col-md-1 col-2">
              <a href="/">
                <img src="/img/cart/plan.png" alt="plan icon" width="50%" />
              </a>
              <p>PLAN</p>
            </div>
            <div className="col-md-1 d-none d-sm-block">
              <img src="/img/cart/arrow.png" alt="arrow icon" width="20%" />
            </div>

            <div className="col-md-1 col-2">
              <a href="/cart">
                <img src="/img/cart/cart.png" alt="cart icon" width="50%" />
              </a>
              <p>CART</p>
            </div>
            <div className="col-md-1 d-none d-sm-block">
              <img src="/img/cart/arrow.png" alt="arrow icon" width="20%" />
            </div>
            <div className="col-md-1 col-2">
              <img
                src="/img/cart/payment.png"
                alt="payment icon"
                width="50%"
              />
              <p>BILL</p>
            </div>
            <div className="col-md-1 d-none d-sm-block">
              <img src="/img/cart/arrow.png" alt="arrow icon" width="20%" />
            </div>
            <div className="col-md-1 col-2">
              <img
                src="/img/cart/delivery.png"
                alt="delivery icon"
                width="50%"
              />
              <p>PAY</p>
            </div>
            <div className="col-md-1 d-none d-sm-block">
              <img src="/img/cart/arrow.png" alt="arrow icon" width="20%" />
            </div>
            <div className="col-md-1 col-2">
              <img src="/img/cart/enjoy.png" alt="enjoy icon" width="50%" />
              <p>ENJOY</p>
            </div>
          </div>
          
          <div className="box__content">
            <div className="card card-form card__payment">
              <div className="card-body">
                <h5 className="txt__title">Order Summary</h5>
                <hr/>
                <div className="row">
                  <div className="col-md-6" />
                  <div className="col-md-3 col-6 box__content__head--center">
                    <p>Amount</p>
                  </div>
                  <div className="col-md-3 col-6 box__content__head--center">
                    <p>Price (Baht)</p>
                  </div>
                </div>
                <hr/>
                  {bill.order.food_order.map(it => (

                    <div className="row" style={{ width: "100%" }}>
                      <div className="col-md-6 col-12 ">
                        <p>{it.food_name}</p>
                      </div>
                      <div className="col-md-3 col-6 box__content--center">
                        <p>{it.amount}</p>
                      </div>
                      <div className="col-md-3 col-6 box__content--center">
                        <p>{it.price}</p>
                      </div>
                    </div>
                  ))}
                  {bill.order.snack_order.map(it => (
                    <div className="row" style={{ width: "100%" }}>
                      <div className="col-md-6 col-12">
                        <p>{it.snack_name}</p>
                      </div>
                      <div className="col-md-3 col-6 box__content--center">
                        <p>{it.amount}</p>
                      </div>
                      <div className="col-md-3 col-6 box__content--center">
                        <p>{it.price}</p>
                      </div>
                    </div>
                  ))}
                  {bill.order.package_order.map(it => (
                    <div className="row" style={{ width: "100%" }}>
                      <div className="col-md-6 col-12">
                        <p>{it.package_name}</p>
                      </div>
                      <div className="col-md-3 col-6 box__content--center">
                        <p>{it.amount}</p>
                      </div>
                      <div className="col-md-3 col-6 box__content--center">
                        <p>{it.price}</p>
                      </div>
                    </div>
                  ))}
                  <hr/>
                </div>
                <br />
                <p>Choose Address</p>
                <div className="dropdown box__addr">
                  <button
                    ref={this.ddDOM}
                    className="btn btn-block dropdown-toggle dd__addr"
                    type="button"
                    data-toggle="dropdown"
                  >
                    Selected
                  </button>
                  <div className="dropdown-menu btn-block">
                    {address.map((it, index) => (
                      <a
                        key={index}
                        className="dropdown-item dd__addr-choice"
                        onClick={this.calculateDeliveryFee.bind(this, index)}
                      >
                        {it.address}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <p>Food cost</p>
                  </div>
                  <div className="col-md-6 col-6 box__content--center">
                    <p>{bill.order_cost}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <p>Distance (kilometer)</p>
                  </div>
                  <div className="col-md-6 col-6 box__content--center">
                    <p>{this.state.distance}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-6">
                    <p>Delivery Fee</p>
                  </div>
                  <div className="col-md-6 col-6 box__content--center">
                    <p>{this.state.deliveryFee}</p>
                  </div>
                </div>
                <hr/>
                <div className="row txt__total">
                  <div className="col-md-6 col-6">
                    <p>Order Total</p>
                  </div>
                  <div className="col-md-6 col-6 box__content--center">
                    <p>{this.state.totalCost}</p>
                  </div>
                </div>
                <div className="row box__confirm" onClick={this.updateBill}>
                  <a href="/payment">
                    <button type="ฺ๊button" className="btn btn-lg button__confirm" >
                        Confirm Order
                    </button>
                  </a>
                </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
