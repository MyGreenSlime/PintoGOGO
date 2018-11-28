import React, { Component } from 'react';
import EditDetail from '../editdetail';

class Addmenu extends Component {
  render() { 
    return ( 
      <React.Fragment>
        <EditDetail
          name="menu_name"
          type="food"
          redirect = "/detail/menu/"/> 
      </React.Fragment>
    );
  }
}
 
export default Addmenu;