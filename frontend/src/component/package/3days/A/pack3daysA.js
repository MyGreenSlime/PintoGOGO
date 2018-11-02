import React, {Component} from 'react';
import '../../package.css';
import Nutrition3A from './nutrition3A';
import axios from 'axios';

export default class Package3daysA extends Component {

	constructor() {
    super();
    this.state = {
      packages: {},
			isLoaded: false
    }
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

	render() {
		const {	packages,
						isLoaded, 
					} = this.state;
		if (!!!isLoaded) {
			return <React.Fragment />
		}

		return (
			<React.Fragment>
			<div className='package-box '>
				<div className='row'>
					<div className='col-md card-package'>
						DAY 1
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[0].day_meal[0].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[0].day_meal[0].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[0].day_meal[0].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[0].day_meal[0].meal_2.menu_name}</h2>
                </div>
							</div>
						</div>
					</div>
					<div className='col-md card-package'>
						DAY 2
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[0].day_meal[1].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[0].day_meal[1].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[0].day_meal[1].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[0].day_meal[1].meal_2.menu_name}</h2>
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
							<img className='card-img img-responsive' src={packages[0].day_meal[2].meal_1.img_url} />
							<div className='overlay'>
								<h2>{packages[0].day_meal[2].meal_1.menu_name}</h2>
							</div>
						</div>
						<div className='col-sm card-pack-img hovereffect'>
							<img className='card-img img-responsive' src={packages[0].day_meal[2].meal_2.img_url} />
							<div className='overlay'>
								<h2>{packages[0].day_meal[2].meal_2.menu_name}</h2>
							</div>
						</div>
					</div>
				</div>
				<div className='col-3-md col-set'></div>
				</div>
        <botton className='btn btn-set' data-toggle="tooltip" data-placement="top" title="HAVE A GOOD MEAL :)"> Add to cart </botton>
    		</div>
        <Nutrition3A />
			</React.Fragment>
		);
	}
}