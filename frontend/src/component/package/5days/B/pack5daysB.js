import React, {Component} from 'react';
import '../../package.css';
import Nutrition5B from './nutrition5B';
import axios from 'axios';
import NoPackage from '../../nopackage'

export default class Package5daysB extends Component {

	constructor() {
    super();
    this.state = {
      packages: {},
			isLoaded: false
    }
  }
  
  componentDidMount() {
    axios.get('/api/packages/system/5days')
    .then(res => {
      this.setState({ 
				isLoaded: true, 
				packages: res.data,
			});
		})
		.then(() => {
			console.log(".....",this.state.packages)
		});
  }

	render() {
		const {	packages,
						isLoaded, 
					} = this.state;
		if (!!!isLoaded) {
			return <React.Fragment />
		}
		if(!packages[1]) {
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
					<div className='col-md card-package'>
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
					<div className='col-md card-package'>
						DAY 4
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[3].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[3].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[3].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[3].meal_2.menu_name}</h2>
                </div>
							</div>
						</div>
					</div>
				</div>	
				
        <div className='row'>
				<div className='col-3-md col-set'></div>
				<div className='col-md card-last-package '>
					DAY 5
					<div className='row'>
						<div className='col-sm card-pack-img hovereffect'>
							<img className='card-img img-responsive' src={packages[1].day_meal[4].meal_1.img_url} />
							<div className='overlay'>
								<h2>{packages[1].day_meal[4].meal_1.menu_name}</h2>
							</div>
						</div>
						<div className='col-sm card-pack-img hovereffect'>
							<img className='card-img img-responsive' src={packages[1].day_meal[4].meal_2.img_url} />
							<div className='overlay'>
								<h2>{packages[1].day_meal[4].meal_2.menu_name}</h2>
							</div>
						</div>
					</div>
				</div>
				<div className='col-3-md col-set'></div>
				</div>
        <botton className='btn btn-set' data-toggle="tooltip" data-placement="top" title="HAVE A GOOD MEAL :)"> Add to cart </botton>
    		</div>
        <Nutrition5B />
			</React.Fragment>
		);
	}
}
