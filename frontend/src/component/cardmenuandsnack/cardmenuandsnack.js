import React, { Component } from "react";
import "./cardmenuandsnack.css";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { deleteFromDB, addToCart } from "../api/api";
import {currentOrder } from "../../actions/authActions"

class cardMenuAndSnack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0
    };
    this.addToCartClick = this.addToCartClick.bind(this)
  }

  addToCartClick(e) {
    this.setState({
      clicked: this.state.clicked + 1
    });
    const menu = {
      [this.props.path + "_id"]: this.props.id,
      [this.props.path + "_name"]: this.props.name,
      price: this.props.price
    };
    const addFoodToCart = addToCart.bind(this, this.props.path, menu);
    addFoodToCart();
    this.props.currentOrder();
    e.preventDefault();
  }

  deleteFromDb() {
    const deleteFood = deleteFromDB.bind(
      this,
      "menus/" + this.props.path,
      this.props.id
    );
    deleteFood();
    this.props.onMenuCardDeleted(this.props.id);
    this.props.currentOrder();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const users = (
      <div className="cartmenu__cart" onClick={this.addToCartClick}>
        <img className="on-click" src={"/img/other/cart.png"} alt="cart icon" height="20" />
      </div>
    );
    const admin = (
      <React.Fragment>
        <div
          className="cartmenu__button__delete"
          onClick={this.deleteFromDb.bind(this)}
        >
          <img src={"/img/other/delete.png"} alt="delete icon" height="20" />
        </div>
      </React.Fragment>
    )
    return( <section className="menu">
      {/* block__element--modify */}
      <div className="on-click-img cardmenu__image">
        <Link to={this.props.path_detail + this.props.id}>
          <img src={this.props.picture} alt={this.props.name} width="70%" className="cardmenu__image--border"  />
        </Link>
      </div>

      <div className="row cardmenu__undermenu">
        <div className="col-9 cardmenu__text">
          <div className="menu-name">
            {this.props.name}<br />
            </div>
            
            {this.props.calories} Kcal
            
        </div>

        <div className="col-3">
          {isAuthenticated ? users : ""}
          {user.type ? admin : ""}
        </div>
      </div>
      </section>
    );
  }
}

cardMenuAndSnack.propTypes = {
  auth: propTypes.object.isRequired,
  order : propTypes.object.isRequired,
  currentOrder : propTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  order : state.order
});

export default connect(mapStateToProps, {currentOrder})(cardMenuAndSnack);
