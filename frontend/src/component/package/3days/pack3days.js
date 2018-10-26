import React, {Component} from 'react';
import '../package.css';
import { RestClient } from '../../api/api'

class Package3days extends Component {
	state = {  }
	render() {
		return (
			<React.Fragment>
			<div className="btn-group btn-group-toggle button-group d-flex flex-row" data-toggle="buttons">
				<button type="radio" className="btn button-set" checked>SET A</button>
  			<button type="radio" className="btn button-set">SET B</button>
			</div>
			<div className='package-box '>
				<div className='row'>
					<div className='col-sm card-package'>
						<p>DAY 1</p>
						<div className='row'>
							<div className='col card-pack-img'>
								<img className='card-img' src='../img/food/salmon_grill_with_sour.JPG' />
							</div>
							<div className='col card-pack-img'>
								<img className='card-img' src='../img/food/salmon_grill_with_sour.JPG' />
							</div>
						</div>
					</div>
					<div className='col-sm card-package'>
						<p>DAY 2</p>
						<div className='row'>
							<div className='col card-pack-img'>
								<img className='card-img' src='../img/food/salmon_grill_with_sour.JPG' />
							</div>
							<div className='col card-pack-img'>
								<img className='card-img' src='../img/food/salmon_grill_with_sour.JPG' />
							</div>
						</div>
					</div>
				</div>	

				<div className=' card-last-package '>
					<p>DAY 3</p>
					<div className='row'>
						<div className='col card-pack-img'>
							<img className='card-img' src='../img/food/salmon_grill_with_sour.JPG' />
						</div>
						<div className='col card-pack-img'>
							<img className='card-img' src='../img/food/salmon_grill_with_sour.JPG' />
						</div>
					</div>
				</div>
    	</div>
			</React.Fragment>
		);
	}
}

export default Package3days;
