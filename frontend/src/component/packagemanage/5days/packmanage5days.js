import React, {Component} from 'react';
import '../packagemanage.css';

export default class PackageManage5days extends Component {
	state = {  }
	render() {
		return (
			<React.Fragment>
				<div className='packagemanage-box '>
          <div className='row'>
            <div className='col-sm card-package'>
              DAY 1
              <div className='row'>
                <div className='col-sm card-pack-img'>
                  <img className='card-img' src='../img/package/blank.PNG' />
                </div>
                <div className='col-sm card-pack-img'>
                  <img className='card-img' src='../img/package/blank.PNG' />
                </div>
              </div>
            </div>
            <div className='col-sm card-package'>
              DAY 2
              <div className='row'>
                <div className='col-sm card-pack-img'>
                  <img className='card-img' src='../img/package/blank.PNG' />
                </div>
                <div className='col-sm card-pack-img'>
                  <img className='card-img' src='../img/package/blank.PNG' />
                </div>
              </div>
            </div>
          </div>	

          <div className='row'>
					<div className='col-sm card-package'>
						DAY 3
						<div className='row'>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/package/blank.PNG' />
							</div>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/package/blank.PNG' />
							</div>
						</div>
					</div>
					<div className='col-sm card-package'>
						DAY 4
						<div className='row'>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/package/blank.PNG' />
							</div>
							<div className='col-sm card-pack-img'>
								<img className='card-img' src='../img/package/blank.PNG' />
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
                <img className='card-img' src='../img/package/blank.PNG' />
              </div>
              <div className='col-sm card-pack-img'>
                <img className='card-img' src='../img/package/blank.PNG' />
              </div>
            </div>
          </div>
          <div className='col-3-sm col-set'></div>
				</div>
        <button className='btn btn-shownutrition'>CLICK TO SHOW NUTRITION</button>
    	</div>
			</React.Fragment>
		);
	}
}
