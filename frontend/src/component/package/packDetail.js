import React, { Component } from "react";
import './package.css'
import Nutrition from "./nutrition";
import axios from "axios";
import NoPackage from "./nopackage";

export default class Package3DaysDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isLoaded: false
    };
    this.addToCart = this.addToCart.bind(this);
    console.log("props" ,this.props)
  }

  componentDidMount() {
    console.log("arrive");
    var url = window.location.href;
    var res = url.split("/");
    axios
      .get("/api/packages/" + res[res.length - 1])
      .then(res => {
        this.setState({
          isLoaded: true,
          packages: res.data
        });
        console.log("from package detail", this.state.packages);
      })
  }

  addToCart() {
    console.log("add pack");
    axios
      .post("/api/packages/addcart", this.state.packages[0])
      .then(alert("Add to cart success!"))
      .then(res => {
        console.log("res", res);
      });
  }

  componentDidUpdate() {
    const $ = window.$;
    $('[data-toggle="tooltip"]').tooltip();
  }

  createDivHover(pack,day,meal){
    return (
      <div className="col card-pack-img hovereffect">
        <img className="card-img img-responsive" src={"\\" + pack[0].day_meal[day]["meal_" + meal].img_url} />
        <div className="overlay">
          <h2>{pack[0].day_meal[day]["meal_" + meal].menu_name}</h2>
        </div>
    </div>);  
  }

  render() {
    const { packages, isLoaded } = this.state;

    let list_day = [];

    if(isLoaded){
      let day = 0
      for(let i = 0; i<3; i+=2){
        if(3%2 == 1 && i == 2 ){
          list_day[i] = 
            <div className="row">
              <div className="col-3-sm col-set" />
              <div className="col-sm card-last-package ">
                {"DAY" + (i+1)}
                <div className="row">
                {this.createDivHover(packages, day + 1, 1)}
                {this.createDivHover(packages, day + 1, 2)}
                </div>
              </div>
              <div className="col-3-sm col-set" />
            </div>
        }
        else{
        list_day[i] = 
        (  <div className="row">
            <div className="col-sm card-package">
              {"DAY " + (i+1)}
              <div className="row">
                {this.createDivHover(packages,day,1)}
                {this.createDivHover(packages,day,2)}
              </div>
            </div>
            <div className="col-sm card-package">
              {"DAY " + (i+2)}
              <div className="row">
                {this.createDivHover(packages,day+1,1)}
                {this.createDivHover(packages,day+1,2)}
              </div>
            </div>
          </div>)
        }
        day+=1
      }
    }

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
              <a href={this.props.location.state.prevLocation}>BACK</a>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="package-box ">
                  <div className="name-pks">{packages[0].name_package}</div>
                  {/* ------------------------------------------------------ */}
                  {list_day}
                  {/* ------------------------------------------------------ */}

                  {/* <div className="row">
                    <div className="col-3-sm col-set" />
                    <div className="col-sm card-last-package ">
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
                    <div className="col-3-sm col-set" />
                  </div> */}
                  {/* <a href="/cart"> */}
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
                  {/* </a> */}
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
