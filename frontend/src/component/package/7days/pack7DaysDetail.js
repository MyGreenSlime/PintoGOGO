import React, { Component } from "react";
import "../package.css";
import Nutrition from "../nutrition";
import axios from "axios";
import NoPackage from "../nopackage";

export default class Package7DaysDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isLoaded: false
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    console.log("arrive");
    var url = window.location.href;
    var res = url.split("/");
    axios.get("/api/packages/" + res[res.length - 1]).then(res => {
      this.setState({
        isLoaded: true,
        packages: res.data
      });
      console.log("from package detail", this.state.packages);
    });
  }

  addToCart() {
    console.log("add pack");
    axios.post("/api/packages/addcart", this.state.packages[0]);
    alert("Add to cart success!");
  }

  render() {
    const { packages, isLoaded } = this.state;

    if (!!!isLoaded) {
      return <div className="loader" />;
    }

    if (!packages[0]) {
      console.log("in no pack");
      return <NoPackage />;
    }

    return (
      <React.Fragment>
        <div className="set-screen-pack">
          <div className="set-frame-each-pks">
            <div className="backtopks row">
              <img src="/img/other/left-arrow.png" height="25px" />
              <a href="/package">BACK TO PACKAGES</a>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="package-box ">
                  <div className="name-pks">{packages[0].name_package}</div>
                  <div className="row">
                    <div className="col-sm card-package">
                      DAY 1
                      <div className="row">
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[0].meal_1.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[0].meal_1.menu_name}</h2>
                          </div>
                        </div>
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[0].meal_2.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[0].meal_2.menu_name}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm card-package">
                      DAY 2
                      <div className="row">
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[1].meal_1.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[1].meal_1.menu_name}</h2>
                          </div>
                        </div>
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[1].meal_2.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[1].meal_2.menu_name}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm card-package">
                      DAY 3
                      <div className="row">
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[2].meal_1.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[2].meal_1.menu_name}</h2>
                          </div>
                        </div>
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[2].meal_2.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[2].meal_2.menu_name}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm card-package">
                      DAY 4
                      <div className="row">
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[3].meal_1.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[3].meal_1.menu_name}</h2>
                          </div>
                        </div>
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[3].meal_2.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[3].meal_2.menu_name}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm card-package">
                      DAY 5
                      <div className="row">
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[4].meal_1.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[4].meal_1.menu_name}</h2>
                          </div>
                        </div>
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[4].meal_2.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[4].meal_2.menu_name}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm card-package">
                      DAY 6
                      <div className="row">
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[5].meal_1.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[5].meal_1.menu_name}</h2>
                          </div>
                        </div>
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[5].meal_2.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[5].meal_2.menu_name}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-3-sm col-set" />
                    <div className="col-sm card-last-package ">
                      DAY 7
                      <div className="row">
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[6].meal_1.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[6].meal_1.menu_name}</h2>
                          </div>
                        </div>
                        <div className="col card-pack-img hovereffect">
                          <img
                            className="card-img img-responsive"
                            src={"\\" + packages[0].day_meal[6].meal_2.img_url}
                          />
                          <div className="overlay">
                            <h2>{packages[0].day_meal[6].meal_2.menu_name}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3-sm col-set" />
                  </div>
                  <a href="/cart">
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
                  </a>
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
