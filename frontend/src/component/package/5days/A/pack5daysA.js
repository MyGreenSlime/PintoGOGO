import React, {Component} from 'react';
import '../../package.css';
import NutritionA from './nutritionA';
import axios from 'axios';

class Package5daysA extends Component {

	constructor() {
    super();
    this.state = {
      menus: [],
      isLoaded: false,
    }
  }
  
  componentDidMount() {
    axios.get('/menus/food')
    .then(res => {
      const allmenus = res.data
      this.setState({ isLoaded: true, menus: allmenus})
    })
  }

	render() {
		return (
			<React.Fragment>
			<div className='package-box '>
				<div className='row'>
					<div className='col-sm card-package'>
						DAY 1
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect' data-toggle="tooltip" data-placement="top" title="แซลมอนย่างเกลือ">
                {/* <p className='menu-name'>แซลมอนย่างเกลือ</p> */}
								<img className='card-img img-responsive' src='../img/food/แซลมอนย่างเกลือ.JPG' />
                <div className='overlay'>
                  <h2>แซลมอน</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/food/แซลมอนย่างเกลือ.JPG' />
							</div>
						</div>
					</div>
					<div className='col-sm card-package'>
						DAY 2
						<div className='row'>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/food/แซลมอนย่างเกลือ.JPG' />
							</div>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/food/แซลมอนย่างเกลือ.JPG' />
							</div>
						</div>
					</div>
				</div>	

        <div className='row'>
					<div className='col-sm card-package'>
						DAY 3
						<div className='row'>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/food/แซลมอนย่างเกลือ.JPG' />
							</div>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/food/แซลมอนย่างเกลือ.JPG' />
							</div>
						</div>
					</div>
					<div className='col-sm card-package'>
						DAY 4
						<div className='row'>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/food/แซลมอนย่างเกลือ.JPG' />
							</div>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/food/แซลมอนย่างเกลือ.JPG' />
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
							<img className='card-img' src='../img/food/แซลมอนย่างเกลือ.JPG' />
						</div>
						<div className='col-sm card-pack-img'>
							<img className='card-img' src='../img/food/แซลมอนย่างเกลือ.JPG' />
						</div>
					</div>
				</div>
				<div className='col-3-sm col-set'></div>
				</div>
        <botton className='btn btn-set'> Add to cart </botton>
    		</div>
        <NutritionA />
			</React.Fragment>
		);
	}
}

export default Package5daysA;
