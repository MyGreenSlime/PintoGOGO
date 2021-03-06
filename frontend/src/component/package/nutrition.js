import React, { Component } from "react";
import "./nutrition.css";
import { getPackage } from "../api/api"

export default class Nutrition extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      package: [],
      daymeal: []
    };
    this.compute = this.compute.bind(this);
  }

  componentDidMount() {
    var url = window.location.href;
    var res = url.split("/");
    const getCurrentPackage = getPackage.bind(this, "packages", "isLoaded", res[res.length - 1])
    getCurrentPackage();
  }

  compute(x) {
    const daymeal = this.state.packages[0].day_meal;
    let sum = 0;
    for (let i = 0; i < daymeal.length; i++) {
      sum = sum + daymeal[i].meal_1[x] + daymeal[i].meal_2[x];
    }
    sum = sum / daymeal.length;
    return sum;
  }

  render() {
    const { packages, isLoaded } = this.state;
    if (!!!isLoaded) {
      return <React.Fragment />;
    }

    if(isLoaded){
    }

    return (
      <React.Fragment>
        <div className="nutrition-box">
          <p>price: {packages[0].price} BAHT 
          <br/>( ลดจาก{" "}{Math.round(packages[0].price*100/95,2)}{" "})</p>
          <div className="description">{packages[0].description}</div>
          <p className="nutrition-text">สารอาหารเฉลี่ยต่อวัน</p>
          <div className="row">
            <div className="col-6">CALORIES</div>
            <div className="col">
              {Math.round(this.compute("calories"), 2)} kCAL/day
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6">
              <p>FAT</p>
            </div>
            <div className="col">
              <p>{Math.round(this.compute("fat"), 2)} g/day</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>CHOLESTEROL</p>
            </div>
            <div className="col">
              <p>{Math.round(this.compute("cholesterol"), 2)} mg/day</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>SODIUM</p>
            </div>
            <div className="col">
              <p>{Math.round(this.compute("sodium"), 2)} mg/day</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>CARBOHYDRATE</p>
            </div>
            <div className="col">
              <p>{Math.round(this.compute("carbohydrate"), 2)} g/day</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>PROTEIN</p>
            </div>
            <div className="col">
              <p>{Math.round(this.compute("protein"), 2)} g/day</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
