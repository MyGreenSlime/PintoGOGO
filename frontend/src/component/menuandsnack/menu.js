import React, { Component } from 'react';
import MenuAndSnack from './menuandsnack'

class Menu extends Component {
  render() { 
    return ( 
      <React.Fragment>
          <MenuAndSnack
            path = "food"
            name = "menu_name"
            path_detail= "/menudetail/"/>
      </React.Fragment>
    );
  }
}
 
export default Menu;