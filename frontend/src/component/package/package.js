import React, {Component} from 'react';
import ChoicePackage from '../choicepackage/choicepackage.js'
import Pack3 from './3days/pack3'
import Pack5 from './5days/pack5'
import Pack7 from './7days/pack7'
import './package.css'
import '../choicepackage/choicepackage.css'
 
class Package extends Component {
  
  constructor(props) {
    super(props);
  } 

	render() {
		return (
      <React.Fragment>
        {/* <ChoicePackage /> */}
        <div className='set-frame-package'>
          <div class="btn-group btn-choice-group" role="group" aria-label="Choice Package">
            <button type="button" class="btn btn-choice-set">3 DAYS</button>
            <button type="button" class="btn btn-choice-set">5 DAYS</button>
            <button type="button" class="btn btn-choice-set">7 DAYS</button>
          </div>
      <Pack5 />
        </div>
        
			</React.Fragment>
		);
	}
}

export default Package;