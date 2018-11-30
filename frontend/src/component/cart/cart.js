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
    this.createCardCart = this.createCardCart.bind(this)
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

  createCardCart(type){
    let card_cart;
    let img_url
    if(type === "package"){
      img_url = ""
    }
    else{
      img_url = "img_url"
    }
    if(!this.state.order[type+"_order"]){
      card_cart = <div/>
    }else{
      card_cart = this.state.order[type + "_order"].map((ord, index) => (
        <CardCart
          handlerFromParant={this.handleData}
          // ord.food_id.img_url
          picture={ord[type +"_id"][img_url]}
          name={ord[type+"_name"]}
          price={ord.price}
          amount={ord.amount}
          id={ord[type+"_id"]._id}
          type_order={type}
        />
      ));
    }
    return card_cart;
  }

  checkOrder(){
    let is_no_order = true;
    for(let data in this.state.order){
      if(this.state.order.hasOwnProperty(data) && typeof this.state.order[data] === 'object'){
        if(this.state.order[data].length !== 0){
          is_no_order = false
        }
      }
    }
    if(is_no_order){
      return <button className="btn button--confirm" disabled> CONFIRM </button>;
    }
    return <button className="btn button--confirm" onClick={this.confirmButtonClicked}> CONFIRM </button>;
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
              <div className="col-1">
                <a href="/">
                  <img src="/img/cart/plan.png" alt="plan icon" width="50%" />
                </a>
                <p>PLAN</p>
              </div>
              <div className="col-1">
                <img src="/img/cart/arrow.png" alt="arrow icon" width="20%" />
              </div>

              <div className="col-1">
                <img src="/img/cart/cart.png" alt="cart icon" width="50%" />
                <p>CART</p>
              </div>
              <div className="col-1">
                <img src="/img/cart/arrow.png" alt="arrow icon" width="20%" />
              </div>
              <div className="col-1">
                <img
                  src="/img/cart/payment.png"
                  alt="payment icon"
                  width="50%"
                />
                <p>PAYMENT</p>
              </div>
              <div className="col-1">
                <img src="/img/cart/arrow.png" alt="arrow icon" width="20%" />
              </div>
              <div className="col-1">
                <img
                  src="/img/cart/delivery.png"
                  alt="delivery icon"
                  width="50%"
                />
                <p>DELIVERY</p>
              </div>
              <div className="col-1">
                <img src="/img/cart/arrow.png" alt="arrow icon" width="20%" />
              </div>
              <div className="col-1">
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
                <div className="col-md-3 col-6 amountzone">AMOUNT</div>
                <div className="col-md-3 col-6">PRICE</div>
              </div>
            </div>
            <div>
              {this.createCardCart("food")}
              {this.createCardCart("snack")}
              {this.createCardCart("package")}
            </div>
            <hr />
            <div>
              <div className="total">
                <p>TOTAL: {this.state.fromChild}</p>
              </div>
              {this.checkOrder()}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Cart;
