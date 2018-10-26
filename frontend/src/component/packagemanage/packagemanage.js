import React, {Component} from 'react';
// import './choicepackage/choicepackage.css';
import ChoicePackage from '../choicepackage/choicepackage.js'
import Packagemanage3days from './3days/packmanage3days.js'
import { RestClient } from '../api/api'

class PackageManage extends Component {
  
  constructor(props) {
    super(props);
  } 

	render() {
		return (
      <React.Fragment>
        <div className='set-screen-package'>
          <ChoicePackage />
          <Packagemanage3days />
        </div>
			</React.Fragment>
		);
	}
}

export default PackageManage;