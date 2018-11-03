import React, {Component} from 'react';
import './package'
export default class NoPackage extends Component {
 
render() {
		return (
      <React.Fragment>
        <div className='package-box'>
          There is no package.
        </div>
			</React.Fragment>
		);
	}
}