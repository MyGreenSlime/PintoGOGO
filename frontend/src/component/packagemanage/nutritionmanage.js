import React, {Component} from 'react';
import './nutritionmanage.css';

export default class NutritionManage extends Component {
	constructor(props) {
	super(props);

    this.state = {
			  packages: {},
			  daymeal: Object.assign({},this.props.menu_detail),
			  length: this.props.day
		}
		this.compute = this.compute.bind(this);
  }

  componentWillReceiveProps(nextProps) {
	this.setState({
		daymeal: Object.assign({},nextProps.menu_detail)
		// daymeal: nextProps.menu_detail.slice()
	  }, () => {
	  })
  }
  
	
	compute(x) {
		const daymeal = this.state.daymeal
		let sum = 0;
		for (let i = 0; i < this.state.length; i++) {
			 sum = sum + daymeal[i][0][x] + daymeal[i][1][x]
		}
		sum = sum/this.state.length
		return sum;
	}

	sumprice(x) {
		const daymeal = this.state.daymeal
		let sum = 0;
		for (let i = 0; i < this.state.length; i++) {
			 sum = sum + daymeal[i][0][x] + daymeal[i][1][x]
		}
		return sum;
	}

	render() {
		return (
			<React.Fragment>
			<div className='nutritionmanage-box'>
			price: {Math.round(this.sumprice("price")*0.95)} BAHT ( ลดจาก {this.sumprice("price")})
			<br/>
			<br/>
				<p className='nutrition-text'>สารอาหารเฉลี่ยต่อวัน</p>
				<div className='row'>
					<div className='col-sm-7'>
						CALORIES
					</div>
					<div className=' col-sm set-align'>
						{Math.round(this.compute("calories"),2)} kCAL/day
					</div>
				</div>
				<hr></hr>
				<div className='row'>
					<div className='col-sm-7'>
						<p>FAT</p>
					</div>
					<div className=' col-sm set-align'>
					<p>{Math.round(this.compute("fat"),2)} g/day</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-7'>
						<p>CHOLESTEROL</p>
					</div>
					<div className=' col-sm set-align'>
					<p>{Math.round(this.compute("cholesterol"),2)} g/day</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-7'>
						<p>SODIUM</p>
					</div>
					<div className=' col-sm set-align'>
					<p>{Math.round(this.compute("sodium"))} g/day</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-7'>
						<p>CARBOHYDRATE</p>
					</div>
					<div className=' col-sm set-align'>
					<p>{Math.round(this.compute("carbohydrate"))} g/day</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-7'>
						<p>PROTEIN</p>
					</div>
					<div className=' col-sm set-align'>
					<p>{Math.round(this.compute("protein"))} g/day</p>
					</div>
				</div>
		</div>
			</React.Fragment>
		);
	}
}

