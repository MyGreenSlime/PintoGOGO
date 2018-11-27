import React, { Component } from 'react';
import './cardmenuandsnack.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Route, Link } from 'react-router-dom'
import MenuDetail from '../detail/menudetail'
import { deleteFromDB, addToCart } from '../api/api'

class cardMenuAndSnack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0
    }
  }

  addToCartClick(e) {
    this.setState({
      clicked: this.state.clicked + 1
    })
    const menu = {
      [this.props.path + "_id"]: this.props.id,
      [this.props.path + "_name"]: this.props.name,
      price: this.props.price
    };
    const addFoodToCart = addToCart.bind(this, this.props.path, menu)
    addFoodToCart();
    e.preventDefault();
  }

  deleteFromDb() {
    const deleteFood = deleteFromDB.bind(this, "menus/" + this.props.path, this.props.id)
    deleteFood();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const users = (
      <div className="cartmenu__cart" onClick={this.addToCartClick.bind(this)}>
        <img src={"/img/other/cart.png"} alt="cart icon" height="20" />
      </div>
    )
    const admin = (
      <React.Fragment>
        <div className="cartmenu__button__delete" onClick={this.deleteFromDb.bind(this)}>
          <img src={"/img/other/delete.png"} alt="delete icon" height="20" />
        </div>
      </React.Fragment>
    )
    return <section className="menu">
      {/* block__element--modify */}
      <div className="cardmenu__image">
        <Link to={this.props.path_detail + this.props.id}>
          <img src={this.props.picture} alt={this.props.name} width="70%" className="cardmenu__image--border"  />
        </Link>
      </div>

      <div className="row cardmenu__undermenu--minwidth">
        <div className="col cardmenu__text">
          <p>
            {this.props.name}<br />
            {this.props.calories} Kcal
            </p>
        </div>

        <div className="col">
          {isAuthenticated ? users : ""}
          {user.type ? admin : ""}
        </div>
      </div>


    </section>;
  }
}

cardMenuAndSnack.propTypes = {
  auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})


export default connect(mapStateToProps)(cardMenuAndSnack);


