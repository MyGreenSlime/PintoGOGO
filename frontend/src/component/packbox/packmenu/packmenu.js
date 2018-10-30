import React, { Component } from 'react';
import axios from "axios";
import '../packmenu/style-packmenu.css'
import { DragDropContainer, DropTarget } from "react-drag-drop-container"

class Packmenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // menus: [],
      // snacks: [],
      // isLoadedMenu: false,
      // isLoadedSnack: false,
      drop: <div className="test--drop__box">drop {this.props.target} here</div>
    }
    this.createDivImage = this.createDivImage.bind(this);
    this.changeRenderAfterDrop = this.changeRenderAfterDrop.bind(this);
  }

  createDivImage(url,name)
  {
    let img = 
      <figure>
        <img src={url} className="menu--image" />
        <figcaption>{name}</figcaption>
      </figure>
    return img;
  }

  changeRenderAfterDrop(e){
    this.setState({
      drop: <div className="after--drop">
          <img src={e.dragData.img_url} className="menu--image" />
        </div> });
  }

  render() { 
    const listMenus = this.props.menus.map((menu, index) => 
    <React.Fragment key={index}>
      <div>
        <DragDropContainer dragData={menu} targetKey="menu" dragClone="true">
          {this.createDivImage(menu.img_url, menu.menu_name)}
        </DragDropContainer>
      </div>
      </React.Fragment>);

    const cols1=[],cols2=[];

    listMenus.forEach((items,i) => {
      if(i%2 === 0){
        cols1.push(items);
      }
      else{
        cols2.push(items);
      }
    })

    const t = <div className="row justify-content-center">
      <div className="col">{cols1}</div>
      <div className="col">{cols2}</div>
    </div>

    return (
    <React.Fragment>
      {/* <div className="container outside--box"> */}
        {/* <h4 className="menu--text__topic">MENU</h4> */}
      <div className="box--detail">
        <div className="row justify-content-center">
          <div className="col ">{cols1}</div>
          <div className="col">{cols2}</div>
        </div>
      </div>
      {/* </div> */}
    </React.Fragment>);
  }
}
 
export default Packmenu;