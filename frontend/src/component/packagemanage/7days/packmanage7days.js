
import React, { Component } from 'react';
import PackEachDay from '../packagemanage_eachday.js'
class Packagemanage7days extends Component {
  render() {
    return (
      <React.Fragment>
        <PackEachDay
          num_day={7} />
      </React.Fragment>
    );
  }
}

export default Packagemanage7days;