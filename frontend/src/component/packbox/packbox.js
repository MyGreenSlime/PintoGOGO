import React, { Component } from 'react';
import Pack from './packmenu/packmenu'
import axios from "axios";
import './style-packbox.css'
import Package from '../packagemanage/packagemanage.js'
import { DragDropContainer, DropTarget } from "react-drag-drop-container";  

class Packbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      snacks: [],
      isLoadedMenu: false,
      isLoadedSnack: false,
      dropFood: <div className="test--drop__box">drop food here</div>,
      dropSnack: <div className="test--drop__box">drop snack here</div>
    };
    this.changeRenderAfterDropFood = this.changeRenderAfterDropFood.bind(this)
    this.changeRenderAfterDropSnack = this.changeRenderAfterDropSnack.bind(this)
  }

  componentDidMount() {
    axios.get("http://localhost:4000/menus/food").then(res => {
      const allmenus = res.data;
      this.setState({ isLoadedMenu: true, menus: allmenus });
    });
    axios.get("http://localhost:4000/menus/snack")
      .then(res => {
        const allsnack = res.data
        this.setState({ isLoadedSnack: true, snacks: allsnack })
      })
  }

  changeRenderAfterDropFood(e) {
    this.setState({
      dropFood: <div className="after--drop">
        <img src={e.dragData.img_url} className="menu--image" />
      </div>
    });
  }

  changeRenderAfterDropSnack(e) {
    this.setState({
      dropSnack: <div className="after--drop">
        <img src={e.dragData.img_url} className="menu--image" />
      </div>
    });
  }

  render() {
    return( 
    <React.Fragment>
      <DropTarget targetKey="menu" onHit={this.changeRenderAfterDropFood}>
        {this.state.dropFood}
      </DropTarget>
      <DropTarget targetKey="snack" onHit={this.changeRenderAfterDropSnack}>
        {this.state.dropSnack}
      </DropTarget>
      <div>
      {/* <Package/> */}
      <nav className="outside--box">
        <div className="nav nav-tabs setnavtab" id="nav-tab" role="tablist">
          <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">MENU</a>
          <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">SNACKS</a>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <Pack menus={this.state.menus} target="menu" />
          </div>
          <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <Pack menus={this.state.snacks} target="snack" />
          </div>
        </div>
      </nav>
      </div>
    </React.Fragment>);
  }
}
 
export default Packbox;