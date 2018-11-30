import React, { Component } from "react";
import "../payment/style-payment.css";
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
        
    }).then( () => {window.location.href = '/payment'})
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

  checkSelectAddr(){
    console.log("select?",this.state.distSelected)
    if(this.state.distSelected){
      return <button type="ฺ๊button" className="btn btn-lg button__confirm" onClick={this.updateBill.bind(this)}> Confirm Order </button>;
    }
    else{
      return <button type="ฺ๊button" className="btn btn-lg button__confirm" disabled> Confirm Order </button>;
    }
  }

  render() {
    const { bill, address, isLoaded } = this.state;

    if (!!!isLoaded) {
      return <div className="loader" />;
    }
    console.log("here addr: ", address);
    console.log("here bill: ", bill);
    return (
      <React.Fragment>
        <div className="set-screen-payment">
          <div className="box__content">
            <div className="card card-form card__payment">
              <div className="card-body">
                <h2 className="txt__title">Order Summary</h2>
                <div className="row">
                  <div className="col">
                    <p />
                  </div>
                  <div className="col col--middle">
                    <p>Amount</p>
                  </div>
                  <div className="col col--right">
                    <p>Price (Baht)</p>
                  </div>
                </div>
                <div className="row">
                  {bill.order.food_order.map(it => (
                    <div className="row" style={{ width: "100%" }}>
                      <div className="col">
                        <p>{it.food_name}</p>
                      </div>
                      <div className="col col--middle">
                        <p>{it.amount}</p>
                      </div>
                      <div className="col col--right">
                        <p>{it.price}</p>
                      </div>
                    </div>
                  ))}
                  {bill.order.snack_order.map(it => (
                    <div className="row" style={{ width: "100%" }}>
                      <div className="col">
                        <p>{it.snack_name}</p>
                      </div>
                      <div className="col col--middle">
                        <p>{it.amount}</p>
                      </div>
                      <div className="col col--right">
                        <p>{it.price}</p>
                      </div>
                    </div>
                  ))}
                  {bill.order.package_order.map(it => (
                    <div className="row" style={{ width: "100%" }}>
                      <div className="col">
                        <p>{it.package_name}</p>
                      </div>
                      <div className="col col--middle">
                        <p>{it.amount}</p>
                      </div>
                      <div className="col col--right">
                        <p>{it.price}</p>
                      </div>
                    </div>
                  ))}
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
                        className="dropdown-item dd__addr-choice break__word"
                        onClick={this.calculateDeliveryFee.bind(this, index)}
                      >
                        {it.address}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Food cost</p>
                  </div>
                  <div className="col col--middle">
                    <p>{bill.order_cost}</p>
                  </div>
                  <div className="col col--right">
                    <p>Baht</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Distance</p>
                  </div>
                  <div className="col col--middle">
                    <p>{this.state.distance}</p>
                  </div>
                  <div className="col col--right">
                    <p>Kilometer</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Delivery Fee</p>
                  </div>
                  <div className="col col--middle">
                    <p>{this.state.deliveryFee}</p>
                  </div>
                  <div className="col col--right">
                    <p>Baht</p>
                  </div>
                </div>
                <div className="row txt__total">
                  <div className="col">
                    <p>Order Total</p>
                  </div>
                  <div className="col col--middle">
                    <p>{this.state.totalCost}</p>
                  </div>
                  <div className="col col--right">
                    <p>Baht</p>
                  </div>
                </div>
                <div className="row box__confirm" onClick={this.updateBill}>
                  {this.checkSelectAddr()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
