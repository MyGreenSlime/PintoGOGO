import React, { Component } from 'react';
import axios from "axios";
import '../packmenu/style-packmenu.css'
import CardPackMenu from '../cardpackmenu/cardpackmenu'

class Packmenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/menus/food')
      .then(res => {
        const allmenus = res.data
        this.setState({ isLoaded: true, menus: allmenus })
      })
  }

  render() { 

    const listMenus = this.state.menus.map(menu => (
      <React.Fragment>
        <figure>
          <img src={menu.img_url} className="menu--image" /> 
          <figcaption>{menu.menu_name}</figcaption>
        </figure>
      </React.Fragment>         
    ));

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