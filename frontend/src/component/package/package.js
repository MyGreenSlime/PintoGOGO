import React, {Component} from 'react';
import ChoicePackage from '../choicepackage/choicepackage.js'
import Package3days from './3days/pack3days'
import Package5days from './5days/pack5days'
 
class Package extends Component {
  
  constructor(props) {
    super(props);
  } 

	render() {
		return (
      <React.Fragment>
        <div className='set-screen-package'>
          <ChoicePackage />
          <Package5days />
        </div>
			</React.Fragment>
		);
	}
}

export default Package;