import React, { Component } from 'react';
import PackDetail from '../packDetail'

export default class Pack3DaysDetail extends Component {
  constructor(props){
    super(props)
  }

  render() { 
    return ( 
      <React.Fragment>
         <PackDetail
          num_day = {3}
          location = {this.props.location.state}/>
      </React.Fragment>
     );
  }
}
 