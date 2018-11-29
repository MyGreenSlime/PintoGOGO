import React, { Component } from "react";
import CardCart from "../cardcart/cardcart";
import "../cart/cart.css";
import { getCurrentOrder, addToBill } from "../api/api";

class Cart extends Component {
  constructor() {
    super();
    this.handleData = this.handleData.bind(this);
    this.raw = {};
    this.state = {
      fromChild: "",
      order: null,
      isLoaded: false
    };
    this.createCardCartFood = this.createCardCartFood.bind(this);
    this.createCardCartSnack = this.createCardCartSnack.bind(this);
    this.createCardPackage = this.createCardPackage.bind(this);
    this.confirmButtonClicked = this.confirmButtonClicked.bind(this);
  }

  handleData(data, price, id) {
    this.raw[id] = [data, price];
    var sum = 0;
    for (var i in this.raw) {
      if (this.raw.hasOwnProperty(i)) {
        sum += parseFloat(this.raw[i][0]) * parseFloat(this.raw[i][1]);
      }
    }
    this.setState({
      fromChild: sum.toString()
    });
  }

  componentDidMount() {
    const getOrder = getCurrentOrder.bind(this, "order", "isLoaded");
    getOrder();
  }

  createCardCartFood() {
    let card_food;
    if (!this.state.order.food_order) {
      card_food = <div />;
    } else {
      card_food = this.state.order.food_order.map((ord, index) => (
        <CardCart
          handlerFromParant={this.handleData}
          picture={ord.food_id.img_url}
          name={ord.food_name}
          price={ord.price}
          amount={ord.amount}
          id={ord.food_id._id}
          type_order="food"
        />
      ));
    }
    return card_food;
  }

  createCardCartSnack() {
    let card_snack;
    if (!this.state.order.snack_order) {
      card_snack = <div />;
    } else {
      card_snack = this.state.order.snack_order.map((ord, index) => (
        <CardCart
          handlerFromParant={this.handleData}
          picture={ord.snack_id.img_url}
          name={ord.snack_name}
          price={ord.price}
          amount={ord.amount}
          id={ord.snack_id._id}
          type_order="snack"
        />
      ));
    }
    return card_snack;
  }

  createCardPackage() {
    let card_package;
    if (!this.state.order.package_order) {
      card_package = <div />;
    } else {
      card_package = this.state.order.package_order.map((ord, index) => (
        <CardCart
          handlerFromParant={this.handleData}
          picture={""}
          name={ord.package_name}
          price={ord.price}
          amount={ord.amount}
          id={ord.package_id._id}
          type_order="package"
        />
      ));
    }
    return card_package;
  }

  confirmButtonClicked() {
    var newBill = {
      order_id: this.state.order._id,
      totalprice: this.state.fromChild
    };
    const addOrderToBill = addToBill.bind(this, newBill);
    addOrderToBill();
  }

  render() {
    if (!this.state.isLoaded) {
      return <div className="loader" />;
    }
    return (
      <React.Fragment>
        <div className="set-screen-cart">
          <div className="linkbutton">
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
                <img src="/img/cart/cart.png" alt="cart icon" width="50%" />
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
          </div>

          <div className="cartbox">
            <div className="header">
              <h4>Cart</h4>
            </div>
            <div className="subhead">
              <div className="row">
                <div className="col-md-6" />
                <div className="col-md-3 col-6">AMOUNT</div>
                <div className="col-md-3 col-6">PRICE</div>
              </div>
            </div>
            <div>
              {this.createCardCartFood()}
              {this.createCardCartSnack()}
              {this.createCardPackage()}
            </div>
            <hr />
            <div>
              <div className="total">
                <p>TOTAL: {this.state.fromChild}</p>
              </div>
              <a href="/bill">
                <button
                  className="btn button--confirm"
                  onClick={this.confirmButtonClicked}
                >
                  CONFIRM
                </button>
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Cart;
