import React, {Component} from 'react';
import '../../package.css';
import Nutrition3B from '../A/nutrition3A';
import axios from 'axios';
import NoPackage from '../../nopackage'

export default class Package3daysB extends Component {

	constructor() {
    super();
    this.state = {
      packages: {},
			isLoaded: false
		}
		this.addPack3DaysBToCart = this.addPack3DaysBToCart.bind(this)
  }
  
  componentDidMount() {
    axios.get('/api/packages/system/3days')
    .then(res => {
      this.setState({ 
				isLoaded: true, 
				packages: res.data,
			});
		})
		.then(() => {
			console.log(this.state.packages)
		});
	}
	
	addPack3DaysBToCart() {
		console.log("add pack")
		const pack3B = {
			package_id: this.state.packages[1]._id,
			name_package: "Package 3 days B",
			price: this.state.packages[1].price
		}
		axios.put("/api/orders/add/package", pack3B);
	}

	render() {
		const {	packages,
						isLoaded, 
					} = this.state;
		if (!!!isLoaded) {
			return <React.Fragment />
		}
		if(!packages[1]) {
			console.log("in no pack")
			return <NoPackage />
		}

		return (
			<React.Fragment>
			<div className='package-box '>
				<div className='row'>
					<div className='col-md card-package'>
						DAY 1
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[0].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[0].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[0].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[0].meal_2.menu_name}</h2>
                </div>
							</div>
						</div>
					</div>
					<div className='col-md card-package'>
						DAY 2
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[1].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[1].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[1].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[1].meal_2.menu_name}</h2>
                </div>
							</div>
						</div>
					</div>
				</div>	

        <div className='row'>
				<div className='col-3-md col-set'></div>
				<div className='col-md card-last-package '>
					DAY 3
					<div className='row'>
						<div className='col-sm card-pack-img hovereffect'>
							<img className='card-img img-responsive' src={packages[1].day_meal[2].meal_1.img_url} />
							<div className='overlay'>
								<h2>{packages[1].day_meal[2].meal_1.menu_name}</h2>
							</div>
						</div>
						<div className='col-sm card-pack-img hovereffect'>
							<img className='card-img img-responsive' src={packages[1].day_meal[2].meal_2.img_url} />
							<div className='overlay'>
								<h2>{packages[1].day_meal[2].meal_2.menu_name}</h2>
							</div>
						</div>
					</div>
				</div>
				<div className='col-3-md col-set'></div>
				</div>
				<a href="/cart">
        <button className='btn btn-set' onClick={this.addPack3DaysBToCart} data-toggle="tooltip" data-placement="top" title="HAVE A GOOD MEAL :)"> Add to cart </button>
    		</a>
				</div>
        <Nutrition3B />
			</React.Fragment>
		);
	}
}