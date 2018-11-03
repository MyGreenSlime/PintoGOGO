import React, {Component} from 'react';
// import { Chart } from 'mdbreact';
import '../../nutrition.css';
import axios from 'axios';

export default class Nutrition7B extends Component {
	constructor() {
    super();
    this.state = {
      packages: {},
			isLoaded: false,
			daymeal: {}
		}
		this.compute = this.compute.bind(this);
  }
  
  componentDidMount() {
    axios.get('/api/packages/system/7days')
    .then(res => {
      this.setState({  
				packages: res.data
			});
		})
		.then(() => {
			this.setState({
				daymeal : this.state.packages[1].day_meal,
				isLoaded: true,
			})
		})
		.then(() => {
			console.log(this.state.daymeal)
		});
	}
	
	compute(x) {
		const daymeal = this.state.daymeal
		let sum = 0;
		for (let i = 0; i < 7; i++) {
			 sum = sum + daymeal[i].meal_1[x] + daymeal[i].meal_2[x]
		}
		sum = sum/7
		return sum;
	}

	render() {
		const {	packages,
						isLoaded, 
					} = this.state;
		if (!!!isLoaded) {
			return <React.Fragment />
		}
		
		return (
			<React.Fragment>
			<div className='nutrition-box'>
				<div className='description'>
					{packages[0].description}
				</div>
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

