import React, { Component } from "react";
import "./package.css";
import Nutrition from "./nutrition";
import NoPackage from "./nopackage";
import { getPackage, addToCart } from "../api/api";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Package3DaysDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isLoaded: false
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    var url = window.location.href;
    var res = url.split("/");

    const get_package = getPackage.bind(
      this,
      "packages",
      "isLoaded",
      res[res.length - 1]
    );
    get_package();
  }

  addToCart() {
    console.log("add pack");
    var newPack = {
      package_id: this.state.packages[0]._id,
      package_name: this.state.packages[0].name_package,
      price: this.state.packages[0].price
    };
    const add_cart = addToCart.bind(this, "package", newPack);
    add_cart();
  }

  componentDidUpdate() {
    const $ = window.$;
    $('[data-toggle="tooltip"]').tooltip();
  }

  createDivHover(pack, day, meal) {
    return (
      <div className="col card-pack-img hovereffect">
        <img
          className="card-img img-responsive"
          src={"\\" + pack[0].day_meal[day]["meal_" + meal].img_url}
          alt={pack[0].day_meal[day]["meal_" + meal].menu_name}
        />
        <div className="overlay">
          <h2>{pack[0].day_meal[day]["meal_" + meal].menu_name}</h2>
        </div>
      </div>
    );
  }

  render() {
    const { packages, isLoaded } = this.state;
    const { isAuthenticated } = this.props.auth;
    let list_day = [];
    const addtoMyCart = (
      <button
        className="btn btn-set"
        onClick={this.addToCart}
        data-toggle="tooltip"
        data-placement="top"
        title="HAVE A GOOD MEAL :)"
      >
        {" "}
        Add to cart{" "}
      </button>
    );
    if (!!!isLoaded) {
      return <div className="loader" />;
    } else {
      let day = 0;
      for (let i = 0; i < packages[0].type; i += 2) {
        if (packages[0].type % 2 === 1 && i === packages[0].type - 1) {
          list_day[i] = (
            <div className="row">
              <div className="col-3-sm col-set" />
              <div className="col-sm card-last-package ">
                {"DAY" + (i + 1)}
                <div className="row">
                  {this.createDivHover(packages, day + 1, 1)}
                  {this.createDivHover(packages, day + 1, 2)}
                </div>
              </div>
              <div className="col-3-sm col-set" />
            </div>
          );
        } else {
          list_day[i] = (
            <div className="row">
              <div className="col-sm card-package">
                {"DAY " + (i + 1)}
                <div className="row">
                  {this.createDivHover(packages, day, 1)}
                  {this.createDivHover(packages, day, 2)}
                </div>
              </div>
              <div className="col-sm card-package">
                {"DAY " + (i + 2)}
                <div className="row">
                  {this.createDivHover(packages, day + 1, 1)}
                  {this.createDivHover(packages, day + 1, 2)}
                </div>
              </div>
            </div>
          );
        }
        day += 1;
      }
    }

    if (!packages[0]) {
      return <NoPackage />;
    }

    return (
      <React.Fragment>
        <div className="set-screen-pack">
          <div className="set-frame-each-pks">
            <div className="backtopks row">
              <img
                src="/img/other/left-arrow.png"
                height="25px"
                alt="left arrow"
              />
              <a href={this.props.location.state.prevLocation}>BACK</a>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="package-box ">
                  <div className="name-pks">{packages[0].name_package}</div>
                  {list_day}
                  {isAuthenticated ? addtoMyCart : ""}
                </div>
              </div>
              <div className="col-md">
                <Nutrition />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Package3DaysDetail.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(Package3DaysDetail));
