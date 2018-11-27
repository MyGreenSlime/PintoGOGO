import React, { Component } from "react";
import "../cardmenu/cardmenu.css";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Route, Link } from "react-router-dom";
import MenuDetail from "../detail/menudetail";
import { deleteFromDB, addToCart } from "../api/api";

class cardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0
    };
  }

  addToCartClick(e) {
    this.setState({
      clicked: this.state.clicked + 1
    });
    const food = {
      food_id: this.props.id,
      food_name: this.props.name,
      price: this.props.price
    };
    const addFoodToCart = addToCart.bind(this, "food", food);
    addFoodToCart();
    e.preventDefault();
  }

  deleteFromDb() {
    const deleteFood = deleteFromDB.bind(this, "menus/food", this.props.id);
    deleteFood();
  }

  sendToMenuDetail() {
    return (
      <div>
        <Route path="/menudetail/:menuId" component={MenuDetail} />
      </div>
    );
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const users = (
      <div className="cartmenu__cart" onClick={this.addToCartClick.bind(this)}>
        <img src={"/img/other/cart.png"} alt="cart icon" height="15" />
      </div>
    );
    const admin = (
      <React.Fragment>
        <div
          className="cartmenu__button__delete"
          onClick={this.deleteFromDb.bind(this)}
        >
          <img src={"/img/other/delete.png"} alt="delete icon" height="15" />
        </div>
      </React.Fragment>
    );
    return (
      <section className="menu">
        {/* block__element--modify */}
        <div className="grid-cardmenu">
          <div className="cardmenu__image center">
            <Link to={"/menudetail/" + this.props.id}>
              <img
                src={this.props.picture}
                alt={this.props.name}
                className="cardmenu__image--border"
                onClick={this.sendToMenuDetail.bind(this)}
              />
            </Link>
          </div>
          <div>
            <div className="grid-description cardmenu__undermenu--minwidth center">
              <div className="cardmenu__text">
                <p>
                  {this.props.name}
                  <br />
                  {this.props.calories} Kcal
                </p>
              </div>

              <div>
                {isAuthenticated ? users : ""}
                {user.type ? admin : ""}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

cardMenu.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(cardMenu);
