import React, { Component } from 'react';
import Menu from '../menuandsnack/menu.js'
import './show.css'

class Showmenu extends Component {

  render() { 
    return (
    <React.Fragment>
      <div className="set-screen-show">
        <div className="topic">MENU</div>
        <Menu/>
      </div>
    </React.Fragment>);
  }
}
 
export default Showmenu;