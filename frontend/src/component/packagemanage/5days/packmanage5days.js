import React, {Component} from 'react';
import '../packagemanage.css';
import { DropTarget } from "react-drag-drop-container";
import { setMenuDrop } from '../helper';
import axios from "axios";


export default class PackageManage5days extends Component {

  constructor(props) {
    super(props);
    this.state = {
      day1_img: [<img className="card-img" src="../img/package/blank.PNG" />, <img className="card-img" src="../img/package/blank.PNG" />],
      day2_img: [<img className="card-img" src="../img/package/blank.PNG" />, <img className="card-img" src="../img/package/blank.PNG" />],
      day3_img: [<img className="card-img" src="../img/package/blank.PNG" />, <img className="card-img" src="../img/package/blank.PNG" />],
      day4_img: [<img className="card-img" src="../img/package/blank.PNG" />, <img className="card-img" src="../img/package/blank.PNG" />],
      day5_img: [<img className="card-img" src="../img/package/blank.PNG" />, <img className="card-img" src="../img/package/blank.PNG" />],
      day1_detail: [],
      day2_detail: [],
      day3_detail: [],
      day4_detail: [],
      day5_detail: [],
    };
    this.send5DaysPackage = this.send5DaysPackage.bind(this)
  }

  send5DaysPackage() {
    const sum_price = (this.state.day1_detail[0].price + this.state.day1_detail[1].price +
                      this.state.day2_detail[0].price + this.state.day2_detail[1].price +
                      this.state.day3_detail[0].price + this.state.day3_detail[1].price +
                      this.state.day4_detail[0].price + this.state.day4_detail[1].price +
                      this.state.day5_detail[0].price + this.state.day5_detail[1].price) * 0.95
    axios.post("/api/packages/add", {
      name_package: "5days manage package",
      description: "",
      type: 5,
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
        }],
      price: sum_price
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

	render() {
		return (
			<React.Fragment>
				<div className='packagemanage-box '>
          <div className='row'>
            <div className='col-sm card-package'>
              DAY 1
              <div className='row'>
                <div className='col-sm card-pack-img'>
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day1_img", "day1_detail", 0)}>
                    {this.state.day1_img[0]}
                  </DropTarget>
                </div>
                <div className='col-sm card-pack-img'>
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day1_img", "day1_detail", 1)}>
                    {this.state.day1_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
            <div className='col-sm card-package'>
              DAY 2
              <div className='row'>
                <div className='col-sm card-pack-img'>
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day2_img", "day2_detail", 0)}>
                    {this.state.day2_img[0]}
                  </DropTarget>
                </div>
                <div className='col-sm card-pack-img'>
                  <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day2_img", "day2_detail", 1)}>
                    {this.state.day2_img[1]}
                  </DropTarget>
                </div>
              </div>
            </div>
          </div>	

          <div className='row'>
					<div className='col-sm card-package'>
						DAY 3
						<div className='row'>
							<div className='col-sm card-pack-img'>
                <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day3_img", "day3_detail", 0)}>
                  {this.state.day3_img[0]}
                </DropTarget>
							</div>
							<div className='col-sm card-pack-img'>
                <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day3_img", "day3_detail", 1)}>
                  {this.state.day3_img[1]}
                </DropTarget>
							</div>
						</div>
					</div>
					<div className='col-sm card-package'>
						DAY 4
						<div className='row'>
							<div className='col-sm card-pack-img'>
                <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day4_img", "day4_detail", 0)}>
                  {this.state.day4_img[0]}
                </DropTarget>
							</div>
							<div className='col-sm card-pack-img'>
                <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day4_img", "day4_detail", 1)}>
                  {this.state.day4_img[1]}
                </DropTarget>
							</div>
						</div>
					</div>
				</div>
				
        <div className='row'>
          <div className='col-3-sm col-set'></div>
          <div className='col-sm card-last-package '>
            DAY 5
            <div className='row'>
              <div className='col-sm card-pack-img'>
                <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day5_img", "day5_detail", 0)}>
                  {this.state.day5_img[0]}
                </DropTarget>
              </div>
              <div className='col-sm card-pack-img'>
                <DropTarget targetKey="menu" onHit={setMenuDrop.bind(this, "day5_img", "day5_detail", 1)}>
                  {this.state.day5_img[1]}
                </DropTarget>
              </div>
            </div>
          </div>
          <div className='col-3-sm col-set'></div>
				</div>
        <button className='btn btn-shownutrition'>CLICK TO SHOW NUTRITION</button>
        <button onClick={this.send5DaysPackage}>Add to cart</button>          
    	</div>
			</React.Fragment>
		);
	}
}