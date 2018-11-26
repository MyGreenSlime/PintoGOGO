import React, { Component } from 'react';
import PackDetail from '../packDetail'

export default class Pack5DaysDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <PackDetail
          num_day={5}
          location={this.props.location.state} />
      </React.Fragment>
    );
  }
}
