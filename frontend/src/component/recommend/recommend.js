import React, { Component } from "react";
import "../recommend/style-recommend.css";
import {Link} from 'react-router-dom'
import { getFoodOrSnack } from "../api/api";

export default class Recommend extends Component {
  constructor() {
    super();
    this.state = {
      menus: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    const get_food = getFoodOrSnack.bind(this,"menus","isLoaded","food");
    get_food();
  }
  render() {
    const { menus, isLoaded } = this.state;

    if (!!!isLoaded) {
      return <React.Fragment />;
    }
    if (!!!menus[0] || !menus[1] || !menus[2] || !menus[3]) {
      return <div />;
    }

    return (
      <section className="recommend__block">
        <p className="txt__rec">Recommended</p>
        <div className="row">
          <div className="col-lg-3 col-sm-6 nopadding">
            <Link to={"/menudetail/" + menus[1]._id}>
              <img className="img-rec" src={menus[1].img_url} />
            </Link>
            <p>{menus[1].menu_name}</p>
          </div>
          <div className="col-lg-3 col-sm-6 nopadding">
            <Link to={"/menudetail/" + menus[3]._id}>
              <img className="img-rec" src={menus[3].img_url} />
            </Link>
            <p>{menus[3].menu_name}</p>
          </div>
          <div className="col-lg-3 col-sm-6 nopadding">
            <Link to={"/menudetail/" + menus[2]._id}>
              <img className="img-rec" src={menus[2].img_url} />
            </Link>
            <p>{menus[2].menu_name}</p>
          </div>
          <div className="col-lg-3 col-sm-6 nopadding">
            <Link to={"/menudetail/" + menus[0]._id}>
              <img className="img-rec" src={menus[0].img_url} />
            </Link>
            <p>{menus[0].menu_name}</p>
          </div>
        </div>
      </section>
    );
  }
}
