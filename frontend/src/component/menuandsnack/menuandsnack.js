import React, { Component } from "react";
import CardMenu from "../cardmenuandsnack/cardmenuandsnack";
import "./menuandsnack.css";
import { getFoodOrSnack } from "../api/api";

class MenuAndSnack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: {},
      isLoaded: false,
      firstImg: 0
    };
    console.log("props", this.props.path);
    this.checkFirstMenuSet = this.checkFirstMenuSet.bind(this);
    this.checkLastMenuSet = this.checkLastMenuSet.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
  }

  componentDidMount() {
    const GetFood = getFoodOrSnack.bind(
      this,
      "menus",
      "isLoaded",
      this.props.path
    );
    GetFood();
  }

  rightClick(e) {
    console.log("Click!!!!");
    this.setState({
      firstImg: this.state.firstImg + 6
    });
    e.preventDefault();
  }

  leftClick(e) {
    console.log("Click!!!!");
    this.setState({
      firstImg: this.state.firstImg - 6
    });
    e.preventDefault();
  }

  checkFirstMenuSet() {
    let img = "";
    if (this.state.firstImg - 6 >= 0) {
      img = (
        <img
          src="/img/other/left-arrow.png"
          alt="left arrow icon"
          height="20"
        />
      );
    }
    console.log("left ", img);
    return img;
  }

  checkLastMenuSet() {
    let img = "";
    if (
      this.state.firstImg + 6 < this.state.menus.length &&
      this.state.menus.length > 0
    ) {
      img = (
        <img
          className="imgbutton"
          src="/img/other/right-arrow.png"
          alt="right arrow icon"
          height="20"
        />
      );
    }
    console.log("right ", img);
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
    const { isLoaded, menus, firstImg } = this.state;

    if (!isLoaded) {
      return <div className="loader" />;
    }

    const col1 = [],
      col2 = [];
    if (isLoaded) {
      console.log("len", menus.length);

      for (let i = firstImg; i < firstImg + 3; i++) {
        if (i < menus.length) {
          const card_col1 = (
            <div className="col-sm-4 menuzone__image--fix">
              <CardMenu
                name={menus[i][this.props.name]}
                picture={menus[i].img_url}
                calories={menus[i].calories}
                id={menus[i]._id}
                price={menus[i].price}
                onMenuCardDeleted={this.onMenuCardDeleted.bind(this, firstImg)}
                path={this.props.path}
                path_detail={this.props.path_detail}
              />
            </div>
          );
          col1.push(card_col1);
        }
        if (i + 3 < menus.length) {
          const card_col2 = (
            <div className="col-sm-4 menuzone__image--fix">
              <CardMenu
                name={menus[i + 3][this.props.name]}
                picture={menus[i + 3].img_url}
                calories={menus[i + 3].calories}
                id={menus[i + 3]._id}
                price={menus[i + 3].price}
                onMenuCardDeleted={this.onMenuCardDeleted.bind(this, firstImg)}
                path={this.props.path}
                path_detail={this.props.path_detail}
              />
            </div>
          );
          col2.push(card_col2);
        }
      }
    }

    const menuShow = (
      <div>
        <div className="row full">{col1}</div>
        <div className="row full">{col2}</div>
      </div>
    );
    return (
      <div id="carouselExampleControls" data-interval={false} class="carousel slide" data-ride="carousel">
      <div className="menuzone">
        <div className="mergerow--left">
        <a href="#carouselExampleControls" role="button" data-slide="prev">
          <div onClick={this.leftClick.bind(this)}>
            {this.checkFirstMenuSet()}
          </div>
          </a>
        </div>

        



        {/* <div id="carouselExampleControls" class="carousel slide" data-ride="carousel"> */}
          <div class="carousel-inner" >
            <div class="carousel-item full-height active">
              {menuShow}
            </div>
            <div class="carousel-item full-height">
              {menuShow}
            </div>
            <div class="carousel-item full-height">
              {menuShow}
            </div>
          </div>




          {/* <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a> */}
          {/* <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a> */}
          {/* <a href="#carouselExampleControls" role="button" data-slide="next">
          <div onClick={this.rightClick.bind(this)}>
            {this.checkLastMenuSet()}
          </div>
          </a> */}
        {/* </div> */}


        <div className="mergerow--right">
        <a href="#carouselExampleControls" role="button" data-slide="next">
          <div onClick={this.rightClick.bind(this)}>
            {this.checkLastMenuSet()}
          </div>
          </a>
        </div>
        <div />
      </div>
      </div>
    );
  }
}

export default MenuAndSnack;
