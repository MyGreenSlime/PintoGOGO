import React, {Component} from 'react';
import '../package.css';
import Package3daysA from './A/pack3daysA'
import Package3daysB from './B/pack3daysB'

export default class Pack3 extends Component {
	state = {  }
	render() {
		return (
			<React.Fragment>
        <nav className='nav-setting'>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a className="nav-item nav-link tab-setting active" id="nav-home-tab" data-toggle="tab" href="#navA" role="tab" aria-controls="nav-A" aria-selected="true">SET A</a>
                <a className="nav-item nav-link tab-setting" id="nav-profile-tab" data-toggle="tab" href="#navB" role="tab" aria-controls="nav-B" aria-selected="false">SET B</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="navA" role="tabpanel" aria-labelledby="nav-home-tab">
                <Package3daysA />
            </div>
            <div class="tab-pane fade" id="navB" role="tabpanel" aria-labelledby="nav-profile-tab">
                <Package3daysB />
            </div>
        </div>
			</React.Fragment>
		);
	}
}
