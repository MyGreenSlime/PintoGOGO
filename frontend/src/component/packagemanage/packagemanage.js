import React, {Component} from 'react';
import ChoicePackage from '../choicepackage/choicepackage.js'
import PackageManage3days from './3days/packmanage3days.js'
import PackageManage5days from './5days/packmanage5days.js'
import PackageManage7days from './7days/packmanage7days.js'
import '../choicepackage/choicepackage.css'
import Packbox from '../packmenubox/packmenu'

class PackageManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pack: <PackageManage3days/>,
      day: 3,
    }

    this.dayComponents = {
      3: PackageManage3days,
      5: PackageManage5days,
      7: PackageManage7days
    };

    this.setDay = this.setDay.bind(this);
  }

  setDay(day) {
    this.setState({day: day});
  }

	render() {
    const { day } = this.state;
    const PackageManage = this.dayComponents[day];
		return(
       <React.Fragment>
        <div className="set-frame-package">
          <ChoicePackage onSetDay={this.setDay} />
          <PackageManage />
        </div>
        <Packbox />
      </React.Fragment>);
	}
}

export default PackageManage;