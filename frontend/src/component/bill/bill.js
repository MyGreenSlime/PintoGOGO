import React, { Component } from "react";
import "../bill/style-bill.css";
import "../cart/cart.css";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Progress from "../progressbar/progressbar";
import { updateBill, getAddress, getBills } from "../api/api";

class Payment extends Component {
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
    const finalOrder = {
      destination: window.txt,
      delivery_fee: this.state.deliveryFee,
      distance: this.state.distance,
      total_cost: this.state.totalCost
    };
    const update_bill = updateBill.bind(this, finalOrder);
    update_bill();
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    const get_bill = getBills.bind(this, "bill", "history");
    get_bill()
      .then(() => {
        if (this.state.bill === null || this.state.bill.order === null) {
          this.props.history.push("/cart");
        }
      })
      .then(() => {
        const get_addr = getAddress.bind(this, "address", "isLoaded");
        get_addr();
      });
  }

  componentDidUpdate() {
    if (this.state.isLoaded) {
      const $ = window.$;
      this.ddDOM = $(this.ddDOM.current);
      this.ddDOM.dropdown();

      $(".dd__addr-choice").click(function() {
        window.txt = $(this).text();
      });
    }
  }

  calculateDeliveryFee(index) {
    let dist = this.state.address[index].distance;
    dist = dist / 1000;
    let fee = dist * 2;
    let packageOrder = this.state.bill.order.package_order;

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
    let total = Math.round(this.state.bill.order_cost + fee);

    this.setState({
      distance: dist,
      deliveryFee: fee,
      distSelected: true,
      totalCost: total
    });
  }

  checkSelectAddr() {
    if (this.state.distSelected) {
      return (
        <button
          type="ฺ๊button"
          className="btn btn-lg button__confirm"
          onClick={this.updateBill.bind(this)}
        >
          {" "}
          Confirm Order{" "}
        </button>
      );
    } else {
      return (
        <button type="ฺ๊button" className="btn btn-lg button__confirm" disabled>
          {" "}
          Confirm Order{" "}
        </button>
      );
    }
  }

  createOrderFood() {
    const foodOrder = this.state.bill.order.food_order.map((it, index) => (
      <div key={index}>
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
      </div>
    ));
    return foodOrder;
  }

  createOrderSnack() {
    const snackOrder = this.state.bill.order.snack_order.map(it => (
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
    ));
    return snackOrder;
  }

  createOrderPackage() {
    const packageOrder = this.state.bill.order.package_order.map(it => (
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
    ));
    return packageOrder;
  }

  render() {
    const { bill, address, isLoaded } = this.state;

    if (!!!isLoaded) {
      return <div className="loader" />;
    }

    return (
      <React.Fragment>
        <div className="set-screen-payment">
          <Progress />

          <div className="box__content">
            <div className="card card-form card__payment">
              <div className="card-body">
                <h5 className="txt__title">Order Summary</h5>
                <hr />
                <div className="row">
                  <div className="col-md-6" />
                  <div className="col-md-3 col-6 box__content__head--center">
                    <p>Amount</p>
                  </div>
                  <div className="col-md-3 col-6 box__content__head--center">
                    <p>Price (Baht)</p>
                  </div>
                </div>
                <hr />
                {this.createOrderFood()}
                {this.createOrderSnack()}
                {this.createOrderPackage()}
                <hr />
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
                  Please Select
                </button>
                <div className="dropdown-menu btn-block">
                  {address.map((it, index) => (
                    <li
                      key={index}
                      className="dropdown-item dd__addr-choice break__word"
                      onClick={this.calculateDeliveryFee.bind(this, index)}
                    >
                      {it.address}
                    </li>
                  ))}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-6">
                  <p>Food cost (Baht)</p>
                </div>
                <div className="col-md-6 col-6 box__content--center">
                  <p>{bill.order_cost}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-6">
                  <p>Distance (Kilometer)</p>
                </div>
                <div className="col-md-6 col-6 box__content--center">
                  <p>{this.state.distance}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-6">
                  <p>Delivery Fee (Baht)</p>
                </div>
                <div className="col-md-6 col-6 box__content--center">
                  <p>{this.state.deliveryFee}</p>
                </div>
              </div>
              <hr />
              <div className="row txt__total">
                <div className="col-md-6 col-6">
                  <p>Order Total (Baht)</p>
                </div>
                <div className="col-md-6 col-6 box__content--center">
                  <p>{this.state.totalCost}</p>
                </div>
              </div>
              <div className="row box__confirm" onClick={this.updateBill}>
                {this.checkSelectAddr()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Payment.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(Payment));
