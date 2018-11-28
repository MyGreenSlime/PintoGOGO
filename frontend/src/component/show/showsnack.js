import React, { Component } from 'react';
import Snack from '../menuandsnack/snack.js'
import './show.css'
class Showsnack extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="topic">SNACK</div>
        <div />
        <Snack />
      </React.Fragment>);
  }
}

export default Showsnack;