import React, {Component} from 'react';
// import { Chart } from 'mdbreact';
import './nutritionmanage.css';
import axios from 'axios';

export default class NutritionManage extends Component {
	constructor(props) {
	super(props);

    this.state = {
      		packages: {},
			// isLoaded: false,
			daymeal: this.props.menu_detail.slice()
		}
		this.compute = this.compute.bind(this);
		console.log("this", this.state.daymeal)
  }
	
	compute(x) {
		const daymeal = this.state.daymeal
		let sum = 0;
		for (let i = 0; i < 3; i++) {
			 sum = sum + daymeal[i][0][x] + daymeal[i][1][x]
		}
		sum = sum/3
		return sum;
	}

	render() {
		return (
			<React.Fragment>
				{console.log("this2", this.state.daymeal)}
			<div className='nutritionmanage-box'>
				<p className='nutrition-text'>สารอาหารเฉลี่ยต่อวัน</p>
				<div className='row'>
					<div className='col-7'>
						CALORIES
					</div>
					{this.compute("calories")} kCAL/day
				</div>
				<hr></hr>
				<div className='row'>
					<div className='col-7'>
						<p>FAT</p>
					</div>
					<p>{this.compute("fat")} g/day</p>
				</div>
				<div className='row'>
					<div className='col-7'>
						<p>CHOLESTEROL</p>
					</div>
					<p>{this.compute("cholesterol")} g/day</p>
				</div>
				<div className='row'>
					<div className='col-7'>
						<p>SODIUM</p>
					</div>
					<p>{this.compute("sodium")} g/day</p>
				</div>
				<div className='row'>
					<div className='col-7'>
						<p>CARBOHYDRATE</p>
					</div>
					<p>{this.compute("carbohydrate")} g/day</p>
				</div>
				<div className='row'>
					<div className='col-7'>
						<p>PROTEIN</p>
					</div>
					<p>{this.compute("protein")} g/day</p>
				</div>
		</div>
			</React.Fragment>
		);
	}
}

