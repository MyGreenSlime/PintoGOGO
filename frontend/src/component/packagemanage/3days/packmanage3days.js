
import React, { Component } from 'react';
import PackEachDay from '../packagemanage_eachday.js'
class Packagemanage3days extends Component {
  render() { 
    return ( 
      <React.Fragment>
        <PackEachDay
          num_day={3}/>
      </React.Fragment>
     );
  }
}
 
export default Packagemanage3days;