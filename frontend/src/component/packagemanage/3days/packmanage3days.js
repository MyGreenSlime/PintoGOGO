import React, {Component} from 'react';
import '../packagemanage.css';

class Packagemanage3days extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      day1_img: ["../img/package/blank.PNG", '../img/package/blank.PNG'],
      day2_img: ["../img/package/blank.PNG", '../img/package/blank.PNG'],
      day3_img: ["../img/package/blank.PNG", '../img/package/blank.PNG'],
      day1_detail: [],
      day2_detail: [],
      day3_detail: [],
    };
    this.setMenuDrop = this.setMenuDrop.bind(this)
  }

  setMenuDrop(dayimg, daydetail, index, e) {
    console.log(dayimg, index, e);
    const newDayMealState = this.state[dayimg].slice();
    const newDayDetailState = this.state[daydetail].slice();
    newDayMealState[index] = e.dragData.img_url;
    newDayDetailState[index] = e.dragData;
    this.setState({
      [dayimg]: newDayMealState,
      [daydetail]: newDayDetailState
    });
    console.log(newDayDetailState);
  }

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
				<div className='col-3-sm col-set'></div>
				<div className='col-sm card-last-package '>
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
				<div className='col-3-sm col-set'></div>
				</div>
        <button className='btn btn-shownutrition'>CLICK TO SHOW NUTRITION</button>
    	</div>
			</React.Fragment>
		);
	}
}

export default Packagemanage3days;
