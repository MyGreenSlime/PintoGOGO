import React, { Component } from 'react';
import PackDetail from '../packDetail'

export default class Pack7DaysDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <PackDetail
          num_day={7}
          location={this.props.location.state} />
      </React.Fragment>
    );
  }
}
