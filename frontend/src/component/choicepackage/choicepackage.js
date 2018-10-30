import React, {Component} from 'react';
import './choicepackage.css';

class ChoicePackage extends Component {
	state = {  }
	render() {
		return (
			<div className='choicepackage-box row'>
        <div className='col'> 
          <a className='link-choice' href="">3 DAYS</a> 
        </div>
        <div className='col'> 
          <a className='link-choice' href="">5 DAYS</a> 
        </div>
        <div className='col'> 
          <a className='link-choice' href="">7 DAYS</a> 
        </div>
      </div>
		);
	}
}

export default ChoicePackage;
