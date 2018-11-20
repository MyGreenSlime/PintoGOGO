import React, { Component } from "react";
import "../payment/style-payment.css";
import axios from "axios";

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: null,
      isLoaded: false
    };

    this.ddDOM = React.createRef();
  }

  componentDidMount() {
    axios
      .get("/api/bills/current")
      .then(res => {
        this.setState({
          bill: res.data,
          isLoaded: true
        });
      })
      .then(() => {
        console.log("whole bill: ", this.state.bill);
        console.log("order: ", this.state.bill.order);
        console.log(
          "food name: ",
          this.state.bill.order.food_order[0].food_name
        );
      });
  }

  componentDidUpdate() {
    if (this.state.isLoaded) {
      const $ = window.$;
      this.ddDOM = $(this.ddDOM.current);
      this.ddDOM.dropdown();
      console.log(this.ddDOM);
    }
  }

  showMenuList() {
    let items;
    if (!this.state.bill.order.food_order) {
      items = <div />;
    } else {
      items = this.state.bill.order.food_order;
      items.map(it => <p>{it.food_name}</p>);
    }
    return items;
  }

  render() {
    const { bill, isLoaded } = this.state;

    if (!!!isLoaded) {
      return <React.Fragment />;
    }

    console.log("here", this.state.bill);
    return (
      <React.Fragment>
        <div className="container set-screen-payment">
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
                    <a className="dropdown-item" href="#">
                      Link One
                    </a>
                    <a className="dropdown-item" href="#">
                      Link Two
                    </a>
                    <a className="dropdown-item" href="#">
                      Link Three
                    </a>
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
                  <div className="col col--right">
                    <p>Kilometer</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Delivery Fee</p>
                  </div>
                  <div className="col col--right">
                    <p>Baht</p>
                  </div>
                </div>
                <div className="row txt__total">
                  <div className="col">
                    <p>Order Total</p>
                  </div>
                  <div className="col col--right">
                    <p>Baht</p>
                  </div>
                </div>
                <div className="row box__confirm">
                  <button className="btn btn-lg button__confirm" type="button">
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
