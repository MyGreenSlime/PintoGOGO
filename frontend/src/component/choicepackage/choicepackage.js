import React, {Component} from 'react';
import Package3days from '../package/3days/A/pack3daysA';
import Package5daysA from '../package/5days/A/pack5daysA';
import './choicepackage.css';

class ChoicePackage extends Component {

  constructor(props){
    super(props)  
  }

	render() {
		return (
      <React.Fragment>
        <div class="btn-group btn-choice-group" role="group" aria-label="Choice Package">
          {
            [3, 5, 7].map(d => (
              <button 
                type="button" 
                class="btn btn-choice-set" 
                onClick={() => this.props.onSetDay(d)}>
                  {d} DAYS
              </button>
            ))
          }
        </div>
      </React.Fragment>
		);
	}
}

export default ChoicePackage;
