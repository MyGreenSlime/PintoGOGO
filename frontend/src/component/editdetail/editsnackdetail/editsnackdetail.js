import React, { Component } from 'react';
import EditDetail from '../editdetail';

class Addmenu extends Component {
  render() { 
    return ( 
      <React.Fragment>
        <EditDetail
          name="snack_name"
          type="snack"
          redirect="/detail/snack/"/> 
      </React.Fragment>
    );
  }
}
 
export default Addmenu;