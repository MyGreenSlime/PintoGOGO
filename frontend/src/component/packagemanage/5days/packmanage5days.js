
import React, { Component } from 'react';
import PackEachDay from '../packagemanage_eachday.js'
class Packagemanage5days extends Component {
  render() {
    return (
      <React.Fragment>
        <PackEachDay
          num_day={5} />
      </React.Fragment>
    );
  }
}

export default Packagemanage5days;