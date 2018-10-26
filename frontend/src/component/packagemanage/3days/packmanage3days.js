import React, {Component} from 'react';
import '../packagemanage.css';
import { RestClient } from '../../api/api'
import { Button } from 'reactstrap';

class Packagemanage3days extends Component {
	state = {  }
	render() {
		return (
			<React.Fragment>
			<div className='packagemanage-box'>
				<div className='row'>
					<div className='col-sm card-package'>
						<p>DAY 1</p>
						<div className='row'>
							<div className='col card-pack-img'>
                <img className='card-img' src='../img/package/blank.PNG' />
							</div>
							<div className='col card-pack-img'>
                <img className='card-img' src='../img/package/blank.PNG' />
							</div>
						</div>
					</div>
					<div className='col-sm card-package'>
						<p>DAY 2</p>
						<div className='row'>
							<div className='col card-pack-img'>
                <img className='card-img' src='../img/package/blank.PNG' />
							</div>
							<div className='col card-pack-img'>
                <img className='card-img' src='../img/package/blank.PNG' />
							</div>
						</div>
					</div>
				</div>	

				<div className=' card-last-package '>
					<p>DAY 3</p>
					<div className='row'>
						<div className='col card-pack-img'>
              <img className='card-img' src='../img/package/blank.PNG' />
						</div>
						<div className='col card-pack-img'>
              <img className='card-img' src='../img/package/blank.PNG' />
						</div>
					</div>
				</div>
        <button className='btn-shownutrition'>CLICK TO SHOW NUTRITION</button>
    	</div>
			</React.Fragment>
		);
	}
}

export default Packagemanage3days;
