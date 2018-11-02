import React, {Component} from 'react';
import '../package.css';
import Package5daysA from './A/pack5daysA'
import Package5daysB from './B/pack5daysB'

class Pack5 extends Component {
	state = {  }
	render() {
		return (
			<React.Fragment>
        <nav className='nav-setting'>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a className="nav-item nav-link tab-setting active" id="nav-home-tab" data-toggle="tab" href="#nav5A" role="tab" aria-controls="nav-A" aria-selected="true">SET A</a>
                <a className="nav-item nav-link tab-setting" id="nav-profile-tab" data-toggle="tab" href="#nav5B" role="tab" aria-controls="nav-B" aria-selected="false">SET B</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav5A" role="tabpanel" aria-labelledby="nav-home-tab">
                <Package5daysA />
            </div>
            <div class="tab-pane fade" id="nav5B" role="tabpanel" aria-labelledby="nav-profile-tab">
                <Package5daysB />
            </div>
        </div>
			</React.Fragment>
		);
	}
}

export default Pack5;
