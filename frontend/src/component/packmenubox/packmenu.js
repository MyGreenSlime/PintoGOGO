
import React, { Component } from 'react';
import './style-packmenu.css'
import { DragDropContainer } from "react-drag-drop-container"
import { getFoodOrSnack } from '../api/api';

class Packmenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      isLoaded: false,
    }
    this.createDivImage = this.createDivImage.bind(this);
    
  }

  componentDidMount() {
    const newGetFood = getFoodOrSnack.bind(this,"menus","isLoaded","food")
    newGetFood()
  }

  createDivImage(url, name) {
    let str_name = name;
    let img = "";
    if(str_name.length > 17){
      str_name = name.substring(0,17) + "..."
    }
    img = 
    <figure>
      <div className="hovereffect">
        <img src={url} className="menu--image" alt={name} />
        <div className="overlay">
          <h2>{name}</h2>
          {/* <a class="btn info" href="#">Detail</a> */}
        </div>
      </div>
      <figcaption>{str_name}</figcaption>
    </figure>

    return img;
  }
  
  render() {
    // create customDragElement
    const img_drag = this.state.menus.map((menu,index) => 
      <React.Fragment key={index}>
        <img src={menu.img_url} className="menu--image__drag" alt={menu.menu_name}/>
      </React.Fragment>
    );
    // create draggable element
    const listMenus = this.state.menus.map((menu, index) => 
      <React.Fragment key={index}>
        <DragDropContainer dragData={menu} targetKey="menu" dragClone="true" customDragElement={img_drag[index]}> 
          {this.createDivImage(menu.img_url, menu.menu_name)}
        </DragDropContainer>
      </React.Fragment>);

    const cols1 = [], cols2 = [];
    //list column
    listMenus.forEach((items, i) => {
      if (i % 2 === 0) {
        cols1.push(items);
      }
      else {
        cols2.push(items);
      }
    })

    if(!this.state.isLoaded){
      return <div className="loader" />;         
    }
    return (
      <React.Fragment>
        <div className="outside--box">
          <h4 className="menu--text">MENU</h4>
          <div className="row justify-content-end">
            <div className="col">
              {cols1}
            </div>
            <div className="col">
              {cols2}
            </div>
          </div>
        </div>
      </React.Fragment>);
  }
}

export default Packmenu;