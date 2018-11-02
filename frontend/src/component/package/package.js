import React, {Component} from 'react';
import ChoicePackage from '../choicepackage/choicepackage.js'
import Package3days from './3days/pack3'
import Package5days from './5days/pack5'
import Package7days from './7days/pack7'
import '../choicepackage/choicepackage.css'
 
class Package extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      pack: <Package5days/>,
      day: 5,
  } 

    this.dayComponents = {
      3: Package3days,
      5: Package5days,
      7: Package7days
    };

    this.setDay = this.setDay.bind(this);
  } 

  setDay(day) {
    this.setState({day: day});
  }

	render() {
    const { day } = this.state;
    const Package = this.dayComponents[day];
		return (
      <React.Fragment>
        <div className='set-frame-package'>
          <ChoicePackage onSetDay={this.setDay} />
          <Package />
        </div>
			</React.Fragment>
		);
	}
}

export default Package;