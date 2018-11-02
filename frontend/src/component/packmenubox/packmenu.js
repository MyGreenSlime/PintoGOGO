
import React, { Component } from 'react';
import axios from "axios";
import './style-packmenu.css'
import { DragDropContainer, DropTarget } from "react-drag-drop-container"

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
    axios.get('/api/menus/food')
      .then(res => {
        const allmenus = res.data
        this.setState({ isLoaded: true, menus: allmenus })
      }).then(() => {console.log(this.state.menus)})
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
        <img src={url} className="menu--image" />
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

    const img_drag = this.state.menus.map((menu,index) => 
      <React.Fragment>
        <img src={menu.img_url} className="menu--image__drop"/>
      </React.Fragment>
    );

    const listMenus = this.state.menus.map((menu, index) => 
      <React.Fragment key={index}>
        <DragDropContainer dragData={menu} targetKey="menu" dragClone="true" customDragElement={img_drag[index]}> 
          {this.createDivImage(menu.img_url, menu.menu_name)}
        </DragDropContainer>
      </React.Fragment>);

    const cols1 = [], cols2 = [];

    listMenus.forEach((items, i) => {
      if (i % 2 === 0) {
        cols1.push(items);
      }
      else {
        cols2.push(items);
      }
    })


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