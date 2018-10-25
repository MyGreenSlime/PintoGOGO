import React, { Component } from 'react';
import axios from "axios";
import '../packmenu/style-packmenu.css'
import CardPackMenu from '../cardpackmenu/cardpackmenu'
import { DragDropContainer, DropTarget } from "react-drag-drop-container"

class Packmenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      isLoaded: false,
      testText: "test",
      drop: <div className="test--drop__box">drop here</div>
    }
    this.createDivImage = this.createDivImage.bind(this);
    this.changeRenderAfterDrop = this.changeRenderAfterDrop.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/menus/food')
      .then(res => {
        const allmenus = res.data
        this.setState({ isLoaded: true, menus: allmenus })
      })
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
    const listMenus = this.state.menus.map(menu => <React.Fragment>
        <div>
          <DragDropContainer dragData={menu} targetKey="drop" dragClone="true">
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

    return (
    <React.Fragment>
      <DropTarget targetKey="drop" onHit={this.changeRenderAfterDrop} onDragEnter={this.highlighted}>
        {this.state.drop}
      </DropTarget>
      <div className="container outside--box">
        <h4 className="menu--text__topic">MENU</h4>
          <div className="row justify-content-end">
            <div className="col ">
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