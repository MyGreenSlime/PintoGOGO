import React, { Component } from 'react';
import Menu from '../menuandsnack/menu.js'
import './show.css'

class Showmenu extends Component {

  render() { 
    return (
    <React.Fragment>
      <div className="topic">MENU</div>
      <Menu/>
    </React.Fragment>);
  }
}
 
export default Showmenu;