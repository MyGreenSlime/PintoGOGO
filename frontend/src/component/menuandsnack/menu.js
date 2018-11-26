import React, { Component } from 'react';
import MenuAndSnack from './menuandsnack'

class Menu extends Component {
  render() { 
    return ( 
      <React.Fragment>
          <MenuAndSnack
            path = "food"
            name = "menu_name"/>
      </React.Fragment>
    );
  }
}
 
export default Menu;