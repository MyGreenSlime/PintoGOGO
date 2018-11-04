import React, { Component } from "react";
import CardCart from "../cardcart/cardcart";
import "../cart/cart.css";
import axios from "axios";

class Cart extends Component {
  constructor() {
    super();
    this.handleData = this.handleData.bind(this);
    this.raw = {};
    this.state = {
      fromChild: "",
      order: [],
      isLoaded: false
    };
    this.createCardCartFood = this.createCardCartFood.bind(this)
    this.createCardCartSnack = this.createCardCartSnack.bind(this)
    this.createCardPackage = this.createCardPackage.bind(this)
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
    axios
      .get("/api/orders/current")
      .then(res => {
        this.setState({
          order: res.data,
          isLoaded: true
        });
      })
      .then(() => {
          console.log("order ", this.state.order);
      });
  }

  createCardCartFood() {
    const card_food = this.state.order[0].food_order.map((ord, index) => (
      <CardCart handlerFromParant={this.handleData} picture={ord.food_id.img_url} name={ord.food_name} price={ord.price} amount={ord.amount} id={ord.food_id._id} type_order="food"/>
    ));
    return card_food;
  }

  createCardCartSnack(){
    const card_snack = this.state.order[0].snack_order.map((ord,index) => (
      <CardCart handlerFromParant={this.handleData} picture={ord.snack_id.img_url} name={ord.snack_name} price={ord.price} amount={ord.amount} id={ord.snack_id._id} type_order="snack"/>      
    ));
    return card_snack;
  }

  createCardPackage(){
    const card_package = this.state.order[0].package_order.map((ord,index) => (
      <CardCart handlerFromParant={this.handleData} picture={""} name = {ord.package_id.type + "days package"} price={ord.package_id.price} amount={ord.amount} id={ord.package_id._id} type_order="package"/>      
    ));
    return card_package;
    
  }

  render() {
    if(!this.state.isLoaded){
      return <div className="loader"/>
    }
    return (
      <React.Fragment>
        <div className="linkbutton">
          <div className="imgcart">
            <a href="/">
              <img src="/img/cart/plan.png" height="40px" />
            </a>
            <p>PLAN</p>
            {/* <a href="/">PLAN</a> */}
          </div>
          <img src="/img/cart/arrow.png" height="30px" />
          <div className="imgcart">
            <img src="/img/cart/cart.png" height="40px" />
            <p>CART</p>
          </div>
          <img src="/img/cart/arrow.png" height="30px" />
          <div className="imgcart">
            <img src="/img/cart/payment.png" height="40px" />
            <p>PAYMENT</p>
          </div>
          <img src="/img/cart/arrow.png" height="30px" />
          <div className="imgcart">
            <img src="/img/cart/delivery.png" height="40px" />
            <p>DELIVERY</p>
          </div>
          <img src="/img/cart/arrow.png" height="30px" />
          <div className="imgcart">
            <img src="/img/cart/enjoy.png" height="40px" />
            <p>ENJOY</p>
          </div>
        </div>

        <div className="cartbox">
          <div className="header">
            <h4>Cart</h4>
          </div>
          <div className="subhead">
            <div className="row">
              <div className="col-6" />
              <div className="col-3 amountzone">AMOUNT</div>
              <div className="col-3">PRICE</div>
            </div>
          </div>
          <div>
            {this.createCardCartFood()}
            {this.createCardCartSnack()}
            {this.createCardPackage()}
            {/* <CardCart handlerFromParant={this.handleData} picture='/img/food/ข้าวกะเพราหมูสับ.jpg' name="MENU NAME" price={100} amount={5} id='01'/>
                    <CardCart handlerFromParant={this.handleData} picture='/img/food/ข้าวกะเพราหมูสับ.jpg' name="MENU NAME" price={120} amount={5} id='02'/> */}
          </div>
          <hr />
          <div>
            <div className="total">
              <p>TOTAL: {this.state.fromChild}</p>
            </div>
            <a href="/bill">
              <button className="btn button--confirm">
                CONFIRM
              </button>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Cart;
