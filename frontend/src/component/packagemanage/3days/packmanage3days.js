import React, {Component} from 'react';
import '../packagemanage.css';
import { DragDropContainer, DropTarget } from "react-drag-drop-container";

class Packagemanage3days extends Component {

	constructor(props){
    super(props);
    this.state = { 
      day1: ["../img/package/blank.PNG", '../img/package/blank.PNG'], 
      day2: ["../img/package/blank.PNG", '../img/package/blank.PNG'], 
      day3: ["../img/package/blank.PNG", '../img/package/blank.PNG']
    };
    this.setMenuDrop = this.setMenuDrop.bind(this)
  }

  setMenuDrop(){
		console.log("drop!!")
  }

	render() {
		return (
			<React.Fragment>
			<div className='packagemanage-box'>
				<div className='row'>
					<div className='col-sm card-package'>
						<p>DAY 1</p>
						<div className='row'>
							<div className='col card-pack-img'>
                <DropTarget targetKey="menu" onHit={this.setMenuDrop}>
                    <img className='card-img' src={this.state.day1[0]} />
                </DropTarget>
							</div>
							<div className='col card-pack-img'>
                  <img className='card-img' src={this.state.day1[1]} />
							</div>
						</div>
					</div>
					<div className='col-sm card-package'>
						<p>DAY 2</p>
						<div className='row'>
							<div className='col card-pack-img'>
                  <img className='card-img' src={this.state.day2[0]} />
							</div>
							<div className='col card-pack-img'>
                <img className='card-img' src={this.state.day2[1]} />
							</div>
						</div>
					</div>
				</div>
				<div className=' card-last-package '>
					<p>DAY 3</p>
					<div className='row'>
						<div className='col card-pack-img'>
              <img className='card-img' src={this.state.day3[0]} />
						</div>
						<div className='col card-pack-img'>
              <img className='card-img' src={this.state.day3[1]} />
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
