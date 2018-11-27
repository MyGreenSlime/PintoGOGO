import React, { Component } from "react";
import CardMenu from "../cardmenuandsnack/cardmenuandsnack";
import "./menuandsnack.css";
import { getFoodOrSnack } from '../api/api';

class MenuAndSnack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: {},
      isLoaded: false,
      firstImg: 0,
      secondImg: 1,
      thirdImg: 2,
      forthImg: 3,
      fifthImg: 4,
      sixthImg: 5,
    };
    console.log("props",this.props.path)
    this.checkFirstMenuSet = this.checkFirstMenuSet.bind(this);
    this.checkLastMenuSet = this.checkLastMenuSet.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
  }

  componentDidMount() {
    const GetFood = getFoodOrSnack.bind(this, "menus", "isLoaded", this.props.path);
    GetFood();
  }

  rightClick(e) {
    console.log("Click!!!!");
    this.setState({
      firstImg: this.state.firstImg + 6,
    });
    e.preventDefault();
  }

  leftClick(e) {
    console.log("Click!!!!");
    this.setState({
      firstImg: this.state.firstImg - 6,
    });
    e.preventDefault();
  }

  checkFirstMenuSet() {
    let img = ""
    if (this.state.firstImg - 6 >= 0) {
      img = <img src="/img/other/left-arrow.png" alt="left arrow icon" height="20" />;
    }
    console.log("left ", img)
    return img;
  }

  checkLastMenuSet() {
    let img = "";
    if(this.state.firstImg + 5 < this.state.menus.length && this.state.menus.length > 0){
      img = <img className="imgbutton" src="/img/other/right-arrow.png" alt="right arrow icon" height="20" />
    }
    console.log("right ", img)
    return img;
  }

  onMenuCardDeleted(index) {
    const newMenus = this.state.menus.slice();
    newMenus.splice(index, 1);
    this.setState({
      menus: newMenus
    });
  }

  render() {
    const {
      isLoaded,
      menus,
      firstImg,
    } = this.state;

    if (!isLoaded) {
      return <div className="loader" />;
    }

    let col1 = [], col2 = []
    if(isLoaded){
      console.log("len",menus.length)
      
      for(let i = firstImg; i<firstImg+3; i++){
        if(i < menus.length){
          const card_col1 = 
            <div className="col-4 menuzone__image--fix">
              {menus[i] && 
                <CardMenu
                  name={menus[i][this.props.name]}
                  picture={menus[i].img_url}
                  calories={menus[i].calories}
                  id={menus[i]._id}
                  price={menus[i].price}
                  onMenuCardDeleted={this.onMenuCardDeleted.bind(this, firstImg)}
                  path={this.props.path}
                  path_detail={this.props.path_detail}
              />}
            </div>
          col1.push(card_col1)
        }
        if(i+3 < menus.length){
          const card_col2 = 
            <div className="col-4 menuzone__image--fix">
              {menus[i] && 
                <CardMenu
                  name={menus[i+3][this.props.name]}
                  picture={menus[i+3].img_url}
                  calories={menus[i+3].calories}
                  id={menus[i+3]._id}
                  price={menus[i+3].price}
                  onMenuCardDeleted={this.onMenuCardDeleted.bind(this, firstImg)}
                  path={this.props.path}
                  path_detail={this.props.path_detail}
              />}
            </div>
          col2.push(card_col2)
        }
      }

    }

    return (
      <div className="menuzone">

        <div className="mergerow--left">
          <div onClick={this.leftClick.bind(this)}>
            {this.checkFirstMenuSet()}</div>
        </div>

        <div className="row">
          <div className="row">
            {col1}
          </div>
          <div className="row">
           {col2}
          </div>
        </div>

        <div className="mergerow--right">
          <div onClick={this.rightClick.bind(this)}>
            {this.checkLastMenuSet()}
          </div>
        </div>
        <div />
      </div>
    );
  }
}

export default MenuAndSnack;
