import React, { Component } from "react";
import propTypes from "prop-types";
import "../cardcart/cardcart.css";
import { increaseAmount, decreaseAmount, deleteOrder } from "../api/api"

class CardCart extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.interval = setInterval(() => this.submitHandler(), 1000);
    this.state = {
      inputField: this.props.amount
    };
  }

  submitHandler() {
    this.props.handlerFromParant(
      this.state.inputField,
      this.props.price,
      this.props.id
    );
  }

  handleChange(event) {
    console.log("event");
    this.setState({
      inputField: event.target.value
    });
  }

  increment() {
    const increase = increaseAmount.bind(this, this.props.type_order, this.props.id);
    increase();
    this.setState({
      inputField: this.state.inputField+1
    })
  }

  decrement() {
    const decrease = decreaseAmount.bind(this, this.props.type_order, this.props.id);
    decrease();
    if (this.state.inputField > 1) {
      this.setState({
        inputField: this.state.inputField-1
      })
    }
  }

  deleteOrder(){
    const deleteFromCart = deleteOrder.bind(this, this.props.type_order, this.props.id)
    deleteFromCart();
    this.setState({
      inputField: 0
    })
    this.forceUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <div className="cardcartbox">
          <hr />
          <div className="row rowcard">
            <div className="col-md-2 d-none d-sm-block img__block">
              <img
                src={this.props.picture}
                width="60%"
                className="cardcart__image"
              />
            </div>
            <div className="col-md-3 col-7 menuname__block">
              <p>{this.props.name}</p>
            </div>
            <div className="col-md-1 col-5 cardcartbox--delete" onClick={this.deleteOrder.bind(this)}>
              DELETE
            </div>
            <div className="col-md-3 col-8 editamount">
              <div className="row">
                <div
                  className="minusbutton "
                  onClick={this.decrement.bind(this)}>
                  <img src={"/img/cart/minus.png"} width="20px" />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={this.state.inputField}
                    value={this.state.inputField}
                    onChange={this.handleChange}
                    style={{ width: "3rem", height: "30px" }}
                  />
                </div>
                <div className="addbutton" onClick={this.increment.bind(this)}>
                  <img src={"/img/cart/add.png"} width="20px" />
                </div>
              </div>
            </div>
            <div className="col-md-3 col-3 cardcart__editamount__price">
              <div className="menuprice">
                <p>{this.props.price}</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CardCart.propTypes = {
  name: propTypes.string,
  amount: propTypes.number
};

export default CardCart;
