import React, {Component} from 'react';
import '../packagemanage.css';
import { setMenuDrop } from '../helper';
import axios from "axios";
import { DropTarget } from "react-drag-drop-container";
import NutritionManage from "../nutritionmanage"

export default class PackageManage5days extends Component {
	constructor(props) {
		super(props);
		this.state = {
			day1_img: [<img className="card-img" src="../img/package/blank.PNG" alt="blank" />, <img className="card-img" src="../img/package/blank.PNG" alt="blank" />],
			day2_img: [<img className="card-img" src="../img/package/blank.PNG" alt="blank" />, <img className="card-img" src="../img/package/blank.PNG" alt="blank"/>],
			day3_img: [<img className="card-img" src="../img/package/blank.PNG" alt="blank"/>, <img className="card-img" src="../img/package/blank.PNG" alt="blank"/>],
			day4_img: [<img className="card-img" src="../img/package/blank.PNG" alt="blank"/>, <img className="card-img" src="../img/package/blank.PNG" alt="blank"/>],
			day5_img: [<img className="card-img" src="../img/package/blank.PNG" alt="blank"/>, <img className="card-img" src="../img/package/blank.PNG" alt="blank"/>],
			day6_img: [<img className="card-img" src="../img/package/blank.PNG" alt="blank"/>, <img className="card-img" src="../img/package/blank.PNG" alt="blank"/>],
			day7_img: [<img className="card-img" src="../img/package/blank.PNG" alt="blank"/>, <img className="card-img" src="../img/package/blank.PNG" alt="blank"/>],
			day1_detail: [],
			day2_detail: [],
			day3_detail: [],
			day4_detail: [],
			day5_detail: [],
			day6_detail: [],
			day7_detail: [],
			sum_price: 0,
			isReadyToShow: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			users: null
		};
		this.send7DaysPackage = this.send7DaysPackage.bind(this)
		this.onSendMenuDetail = this.onSendMenuDetail.bind(this)
		// this.add7DaysPackageToCart = this.add7DaysPackageToCart.bind(this)
	}

	componentDidMount() {
		axios.get("/api/users/profile")
			.then(res => {
				this.setState({
					user: res.data.user_name
				});
			})
			.then(() => {
				console.log(this.state.user);
			});
	}

	send7DaysPackage(path) {
		console.log(path + " package")
		const newPackage = {
			name_package: this.state.user + new Date().toISOString().replace(/:/g, '-'),
			description: "7 days package",
			type: 7,
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
				},
				{
					meal_1: this.state.day4_detail[0],
					meal_2: this.state.day4_detail[1]
				},
				{
					meal_1: this.state.day5_detail[0],
					meal_2: this.state.day5_detail[1]
				},
				{
					meal_1: this.state.day6_detail[0],
					meal_2: this.state.day6_detail[1]
				},
				{
					meal_1: this.state.day7_detail[0],
					meal_2: this.state.day7_detail[1]
				},],
			price: this.state.sum_price
		};
		axios.post("/api/packages/" + path, newPackage)
			.then(function (response) {
				// console.log("save packages")
				console.log(response);
				if (path == "add") {
					alert("Save Package");
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	}



	onSendMenuDetail() {
		const newAllDetail = [ 
		  this.state.day1_detail, 
		  this.state.day2_detail,
		  this.state.day3_detail,
		  this.state.day4_detail,
		  this.state.day5_detail,
		  this.state.day6_detail,
		  this.state.day7_detail,
		];
		this.setState({
		  all_detail: newAllDetail,
			isLoaded: true,
			sum_price:  Math.round((this.state.day1_detail[0].price + this.state.day1_detail[1].price +
															this.state.day2_detail[0].price + this.state.day2_detail[1].price +
															this.state.day3_detail[0].price + this.state.day3_detail[1].price +
															this.state.day4_detail[0].price + this.state.day4_detail[1].price +
															this.state.day5_detail[0].price + this.state.day5_detail[1].price +
															this.state.day6_detail[0].price + this.state.day6_detail[1].price +
															this.state.day7_detail[0].price + this.state.day7_detail[1].price) * 0.95)
		},() => { 
		console.log("this is from package")
		})
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

	render() {
		return <React.Fragment>
        <div className="packagemanage-box ">
          <div className="row">
            <div className="col-sm card-package">
              DAY 1<div className="row">
                <div className="col card-pack-img">
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day1_img", "day1_detail", "isReadyToShow", 0, 0)}>
                    {this.state.day1_img[0]}
                  </DropTarget>
                </div>
                <div className="col card-pack-img">
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day1_img", "day1_detail", "isReadyToShow", 1, 1)}>
                    {this.state.day1_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
            <div className="col-sm card-package">
              DAY 2<div className="row">
                <div className="col card-pack-img">
									<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day2_img", "day2_detail", "isReadyToShow", 0, 2)}>
                    {this.state.day2_img[0]}
                  </DropTarget>
                </div>
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day2_img", "day2_detail", "isReadyToShow", 1, 3)}>
                    {this.state.day2_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm card-package">
              DAY 3<div className="row">
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day3_img", "day3_detail", "isReadyToShow", 0, 4)}>
                    {this.state.day3_img[0]}
                  </DropTarget>
                </div>
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day3_img", "day3_detail", "isReadyToShow", 1, 5)}>
                    {this.state.day3_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
            <div className="col-sm card-package">
              DAY 4<div className="row">
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day4_img", "day4_detail", "isReadyToShow", 0, 6)}>
                    {this.state.day4_img[0]}
                  </DropTarget>
                </div>
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day4_img", "day4_detail", "isReadyToShow", 1,7)}>
                    {this.state.day4_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm card-package">
              DAY 5<div className="row">
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day5_img", "day5_detail", "isReadyToShow", 0,8)}>
                    {this.state.day5_img[0]}
                  </DropTarget>
                </div>
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day5_img", "day5_detail", "isReadyToShow", 1,9)}>
                    {this.state.day5_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
            <div className="col-sm card-package">
              DAY 6<div className="row">
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day6_img", "day6_detail", "isReadyToShow", 0, 10)}>
                    {this.state.day6_img[0]}
                  </DropTarget>
                </div>
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day6_img", "day6_detail", "isReadyToShow", 1, 11)}>
                    {this.state.day6_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-3-sm col-set" />
            <div className="col-sm card-last-package ">
              DAY 7<div className="row">
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day7_img", "day7_detail", "isReadyToShow", 0, 12)}>
                    {this.state.day7_img[0]}
                  </DropTarget>
                </div>
                <div className="col card-pack-img">
								<DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day7_img", "day7_detail", "isReadyToShow", 1, 13)}>
                    {this.state.day7_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
            <div className="col-3-sm col-set" />
          </div>
          {this.checkReady()}
          {/* <button className="btn btn-shownutrition" onClick={this.onSendMenuDetail}>
            CLICK TO SHOW DETAIL
          </button> */}
          {this.state.all_detail && this.state.all_detail.length > 0 && this.state.isLoaded && <React.Fragment>
                <div>
                  <NutritionManage menu_detail={this.state.all_detail} />
                </div>
                <div>
                  <a href='/cart'>
                    <button
                      className="btn btn-shownutrition"
                      onClick={() => this.send7DaysPackage("anonymous/addcart")}
                    >
                      Add to cart
                      </button>
                  </a>
                  <button
                    className="btn btn-shownutrition"
                    onClick={() => this.send7DaysPackage("add")}
                  >
                    SAVE PACKAGE
                  </button>
                </div>
              </React.Fragment>}
        </div>
      </React.Fragment>;
	}
}
