import React, { Component } from "react";
import "../packagemanage.css";
import { DropTarget } from "react-drag-drop-container";
import { setMenuDrop } from "../helper";
import axios from "axios";
import NutritionManage from "../nutritionmanage"


class Packagemanage3days extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day1_img: [<img className="card-img" src="../img/package/blank.PNG" />, <img className="card-img" src="../img/package/blank.PNG" />],
      day2_img: [<img className="card-img" src="../img/package/blank.PNG" />, <img className="card-img" src="../img/package/blank.PNG" />],
      day3_img: [<img className="card-img" src="../img/package/blank.PNG" />, <img className="card-img" src="../img/package/blank.PNG" />],
      day1_detail: [],
      day2_detail: [],
      day3_detail: [],
      all_detail: [],
      sum_price: 0,
      isReadyToShow: [false,false,false,false,false,false]
    };
    this.send3DaysPackage = this.send3DaysPackage.bind(this)
    this.onSendMenuDetail = this.onSendMenuDetail.bind(this)
    this.add3DaysPackageToCart = this.add3DaysPackageToCart.bind(this)
  }

  send3DaysPackage(){
    this.setState({
      sum_price: (this.state.day1_detail[0].price + this.state.day1_detail[1].price +
                  this.state.day2_detail[0].price + this.state.day2_detail[1].price +
                  this.state.day3_detail[0].price + this.state.day3_detail[1].price) * 0.95
    })
    axios.post("/api/packages/add", {
      name_package: "3days manage package",
      description: "",
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
        }],
      price: this.state.sum_price
    })
      .then(function (response) {
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
    this.setState({
      all_detail: newAllDetail,
    },() => {
    })
  }

  checkReady(){
    let all_ready = true
    this.state.isReadyToShow.map((ready,index) => 
      {if(!ready){
        all_ready = false
      }}
    )
    console.log(all_ready);
    if(all_ready){
      return <button className="btn btn-shownutrition" onClick={this.onSendMenuDetail}>
        CLICK TO SHOW NUTRITION
      </button> 
    }
    // return <button className="btn btn-shownutrition" disabled>
    //   CLICK TO SHOW NUTRITION
    // </button>
    return <div></div>
  }

  add3DaysPackageToCart(){
    var time = new Date();
    var user,now_time;
    axios.get("/api/users/profile")
      .then(res => {
        user = res.data.user_name;
      })
      .then(() => axios.post('/api/packages/anonymous/addcart'), {
        name_package: time.getFullYear().toString + (time.getMonth()+1).toString + time.getDate().toString + time.getHours().toString
                      + time.getMinutes().toString + time.getSeconds().toString,
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
          }],
          price: this.state.sum_price
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const {nutrition} = this.state
    return <React.Fragment>
        <div className="packagemanage-box ">
          <div className="row">
            <div className="col-sm card-package">
              DAY 1<div className="row">
                <div className="col-sm card-pack-img">
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day1_img", "day1_detail", "isReadyToShow", 0, 0)}>
                    {this.state.day1_img[0]}
                  </DropTarget>
                </div>
                <div className="col-sm card-pack-img">
                <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day1_img", "day1_detail", "isReadyToShow", 1, 1)}>
                    {this.state.day1_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
            <div className="col-sm card-package">
              DAY 2<div className="row">
                <div className="col-sm card-pack-img">
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day2_img", "day2_detail", "isReadyToShow", 0, 2)}>              
                    {this.state.day2_img[0]}
                  </DropTarget>
                </div>
                <div className="col-sm card-pack-img">
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day2_img", "day2_detail", "isReadyToShow", 1, 3)}>                              
                    {this.state.day2_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-3-sm col-set" />
            <div className="col-sm card-last-package ">
              DAY 3<div className="row">
                <div className="col-sm card-pack-img">
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day3_img", "day3_detail", "isReadyToShow", 0, 4)}>                              
                    {this.state.day3_img[0]}
                  </DropTarget>
                </div>
                <div className="col-sm card-pack-img">
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day3_img", "day3_detail", "isReadyToShow", 1, 5)}>                              
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
            { 
              (this.state.all_detail && this.state.all_detail.length > 0) && 
              <React.Fragment>
              <div>
                <NutritionManage menu_detail={this.state.all_detail} />
              </div>
              <div>
                <button className="btn btn-shownutrition" onClick={this.add3DaysPackageToCart}>Add to cart</button>
                <button className="btn btn-shownutrition" onClick={this.send3DaysPackage}>SAVE PACKAGE</button>
              </div>
              </React.Fragment>
            }
        </div>
      </React.Fragment>;
  }
}

export default Packagemanage3days;
