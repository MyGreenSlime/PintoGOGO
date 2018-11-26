import React, { Component } from 'react';
import MenuAndSnack from './menuandsnack'

class Snack extends Component {
  render() {
    return (
      <React.Fragment>
        <MenuAndSnack
          path="snack"
          name = "snack_name" />
      </React.Fragment>
    );
  }
}

export default Snack;