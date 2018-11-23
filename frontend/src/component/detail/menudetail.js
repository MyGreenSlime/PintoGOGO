import React, { Component } from 'react';
import Detail from './detail'

class Menudetail extends Component {
  render() { 
    return ( 
        <React.Fragment>
            <Detail 
             name = "menu_name"
             type = "MENU"
             path_get_data = "food/"
             path_to_edit = "editmenudetail"/>
        </React.Fragment>
      );
  }
}
 
export default Menudetail;