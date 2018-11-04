import React, { Component } from "react";
import CardCart from "../cardcart/cardcart";
import "../cart/cart.css";

class Cart extends Component{
    constructor() {
        super();
        this.handleData = this.handleData.bind(this);
        this.raw = {}
        this.state = {
          fromChild: ""
        };
    }
      
    handleData(data,price,id) {
        this.raw[id] = [data, price]
        var sum = 0;
        for( var i in this.raw ) {
            if( this.raw.hasOwnProperty( i ) ) {
              sum += parseFloat(this.raw[i][0])*parseFloat(this.raw[i][1]);
            }
        }
        this.setState({
            fromChild: sum.toString()
        });
    }
    render(){
        return <React.Fragment>
            <div className="linkbutton">
                <div className="imgcart">
                <a href="/"><img src='/img/cart/plan.png' height="40px"/></a>
                    <p>PLAN</p>
                    {/* <a href="/">PLAN</a> */}
                </div>
                <img src='/img/cart/arrow.png' height="30px"/>
                <div className="imgcart">
                    <img src='/img/cart/cart.png' height="40px"/>
                    <p>CART</p>
                </div>
                <img src='/img/cart/arrow.png' height="30px"/>
                <div className="imgcart">
                    <img src='/img/cart/payment.png' height="40px"/>
                    <p>PAYMENT</p>
                </div>
                <img src='/img/cart/arrow.png' height="30px"/>
                <div className="imgcart">
                    <img src='/img/cart/delivery.png' height="40px"/>
                    <p>DELIVERY</p>
                </div>
                <img src='/img/cart/arrow.png' height="30px"/>
                <div className="imgcart">
                    <img src='/img/cart/enjoy.png' height="40px"/>
                    <p>ENJOY</p>
                </div>

            </div>

            <div className="cartbox">
                
                <div className="header">
                    <h4>Cart</h4>
                </div>
                <div className="subhead">
                    <div className="row">
                        <div className="col-6"></div>
                        <div className="col-3 amountzone">
                            AMOUNT
                        </div>
                        <div className="col-3">
                            PRICE
                        </div>
                    </div>
                </div>
                <div>
                    <CardCart handlerFromParant={this.handleData} picture='/img/food/ข้าวกะเพราหมูสับ.jpg' name="MENU NAME" price={100} amount={5} id='01'/>
                    <CardCart handlerFromParant={this.handleData} picture='/img/food/ข้าวกะเพราหมูสับ.jpg' name="MENU NAME" price={120} amount={5} id='02'/>
                </div>
                <hr></hr>
                <div>
                    <div className="total">
                        <p>TOTAL: {this.state.fromChild}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}
export default Cart;