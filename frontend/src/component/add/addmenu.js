import React, { Component } from 'react';
import Add from './add';

class Addmenu extends Component {
  render() { 
    return ( 
      <React.Fragment>
        <Add
          name = "menu_name"
          path = "food"
          redirect = "menu"/> 
      </React.Fragment>
    );
  }
}
 
export default Addmenu;