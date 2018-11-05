import React, { Component } from "react";
import "../packagemanage.css";
import { DropTarget } from "react-drag-drop-container";
import { setMenuDrop } from "../helper";
import axios from "axios";
import NutritionManage from "../nutritionmanage";

class Packagemanage3days extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day1_img: [
        <img className="card-img" src="../img/package/blank.PNG" />,
        <img className="card-img" src="../img/package/blank.PNG" />
      ],
      day2_img: [
        <img className="card-img" src="../img/package/blank.PNG" />,
        <img className="card-img" src="../img/package/blank.PNG" />
      ],
      day3_img: [
        <img className="card-img" src="../img/package/blank.PNG" />,
        <img className="card-img" src="../img/package/blank.PNG" />
      ],
      day1_detail: [],
      day2_detail: [],
      day3_detail: [],
      all_detail: [],
      sum_price: 0,
      isReadyToShow: [false, false, false, false, false, false],
      user: null
    };
    this.send3DaysPackage = this.send3DaysPackage.bind(this);
    this.onSendMenuDetail = this.onSendMenuDetail.bind(this);
    this.add3DaysPackageToCart = this.add3DaysPackageToCart.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/users/profile")
      .then(res => {
        this.setState({
          user: res.data.user_name
        });
      })
      .then(() => {
        console.log(this.state.user);
      });
  }
  
  send3DaysPackage() {
    const newPackage = {
      name_package: this.state.user + new Date().toISOString().replace(/:/g, '-'),
      description: "manage 3 days package",
      type: 3,
      day_meal: [
        {
          meal_1: this.state.day1_detail[0],
          meal_2: this.state.day1_detail[1]
        },
        {
          meal_1: this.state.day2_detail[0],
          meal_2: this.state.day2_detail[1]
        },
        {
          meal_1: this.state.day3_detail[0],
          meal_2: this.state.day3_detail[1]
        },],
      price: this.state.sum_price
    };
    axios.post("/api/packages/add", newPackage)
      .then(function (response) {
        console.log("save packages")
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onSendMenuDetail() {
    const newAllDetail = [
      this.state.day1_detail,
      this.state.day2_detail,
      this.state.day3_detail
    ];
    this.setState(
      {
        all_detail: newAllDetail,
        sum_price: Math.round((this.state.day1_detail[0].price +
                  this.state.day1_detail[1].price +
                  this.state.day2_detail[0].price +
                  this.state.day2_detail[1].price +
                  this.state.day3_detail[0].price +
                  this.state.day3_detail[1].price) * 0.95)
      },
      () => {}
    );
  }

  checkReady() {
    let all_ready = true;
    this.state.isReadyToShow.map((ready, index) => {
      if (!ready) {
        all_ready = false;
      }
    });
    console.log(all_ready);
    if (all_ready) {
      return (
        <button
          className="btn btn-shownutrition"
          onClick={this.onSendMenuDetail}
        >
          CLICK TO SHOW NUTRITION
        </button>
      );
    }
    console.log("price ", this.state.sum_price)    
    return <div />;
  }

  // onSendMenuDetail() {
  //   const newAllDetail = [ 
  //     this.state.day1_detail, 
  //     this.state.day2_detail,
  //     this.state.day3_detail
  //   ];
  //   this.setState({
  //     all_detail: newAllDetail,
  //     isLoaded: true,
  //   },() => { 
  //   console.log("this is from package")
  //   })
  // }

  add3DaysPackageToCart() {
    const newPackage = {
      name_package: this.state.user + new Date().toISOString().replace(/:/g, '-'),
      description: "manage 3 days package",
      type: 3,
      day_meal: [
        {
          meal_1: this.state.day1_detail[0],
          meal_2: this.state.day1_detail[1]
        },
        {
          meal_1: this.state.day2_detail[0],
          meal_2: this.state.day2_detail[1]
        },
        {
          meal_1: this.state.day3_detail[0],
          meal_2: this.state.day3_detail[1]
        }
      ],
      price: this.state.sum_price
    };
    axios
      .post("/api/packages/anonymous/addcart", newPackage)
      .then(function (response) {
        console.log("add to cart")
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { nutrition } = this.state;
    return (
      <React.Fragment>
        <div className="packagemanage-box ">
          <div className="row">
            <div className="col-sm card-package">
              DAY 1
              <div className="row">
                <div className="col-sm card-pack-img">
                  <DropTarget
                    targetKey="menu"
                    onHit={setMenuDrop.bind(
                      this,
                      "day1_img",
                      "day1_detail",
                      "isReadyToShow",
                      0,
                      0
                    )}
                  >
                    {this.state.day1_img[0]}
                  </DropTarget>
                </div>
                <div className="col-sm card-pack-img">
                  <DropTarget
                    targetKey="menu"
                    onHit={setMenuDrop.bind(
                      this,
                      "day1_img",
                      "day1_detail",
                      "isReadyToShow",
                      1,
                      1
                    )}
                  >
                    {this.state.day1_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
            <div className="col-sm card-package">
              DAY 2
              <div className="row">
                <div className="col-sm card-pack-img">
                  <DropTarget
                    targetKey="menu"
                    onHit={setMenuDrop.bind(
                      this,
                      "day2_img",
                      "day2_detail",
                      "isReadyToShow",
                      0,
                      2
                    )}
                  >
                    {this.state.day2_img[0]}
                  </DropTarget>
                </div>
                <div className="col-sm card-pack-img">
                  <DropTarget
                    targetKey="menu"
                    onHit={setMenuDrop.bind(
                      this,
                      "day2_img",
                      "day2_detail",
                      "isReadyToShow",
                      1,
                      3
                    )}
                  >
                    {this.state.day2_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-3-sm col-set" />
            <div className="col-sm card-last-package ">
              DAY 3
              <div className="row">
                <div className="col-sm card-pack-img">
                  <DropTarget
                    targetKey="menu"
                    onHit={setMenuDrop.bind(
                      this,
                      "day3_img",
                      "day3_detail",
                      "isReadyToShow",
                      0,
                      4
                    )}
                  >
                    {this.state.day3_img[0]}
                  </DropTarget>
                </div>
                <div className="col-sm card-pack-img">
                  <DropTarget
                    targetKey="menu"
                    onHit={setMenuDrop.bind(
                      this,
                      "day3_img",
                      "day3_detail",
                      "isReadyToShow",
                      1,
                      5
                    )}
                  >
                    {this.state.day3_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
            <div className="col-3-sm col-set" />
          </div>
          
          {this.checkReady()}
          {/* <button className="btn btn-shownutrition" onClick={this.onSendMenuDetail}>
            CLICK TO SHOW NUTRITION
          </button> */}
          {this.state.all_detail &&
            this.state.all_detail.length > 0 && (
              <React.Fragment>
                <div>
                  <NutritionManage menu_detail={this.state.all_detail} />
                </div>
                <div>
                  <a href='/cart'>
                  <button
                    className="btn btn-shownutrition"
                    onClick={this.add3DaysPackageToCart()}
                  >
                    Add to cart
                  </button>
                  </a>
                  <button
                    className="btn btn-shownutrition"
                    onClick={this.send3DaysPackage()}
                  >
                    SAVE PACKAGE
                  </button>
                </div>
              </React.Fragment>
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default Packagemanage3days;
