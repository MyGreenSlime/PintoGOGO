import React, { Component } from "react";
import "../recommend/style-recommend.css";
import axios from "axios";

export default class Recommend extends Component {
  constructor() {
    super();
    this.state = {
      menus: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    axios
      .get("/api/menus/food")
      .then(res => {
        this.setState({
          isLoaded: true,
          menus: res.data
        });
      })
      .then(() => {
        console.log("menu: ", this.state.menus);
      });
  }
  render() {
    const { menus, isLoaded } = this.state;

    if (!!!isLoaded) {
      return <React.Fragment />;
    }
    if (!!!menus[0]) {
      return (
        <div>
          
        </div>
      )
    }

    return (
      <section className="recommend__block">
        <p className="txt__rec">Recommended</p>
        <div className="row">
          <div className="col-lg-3 col-md-6 nopadding">
            <img className="img-rec" src={menus[1].img_url} />
            <p>{menus[1].menu_name}</p>
          </div>
          <div className="col-lg-3 col-md-6 nopadding">
            <img className="img-rec" src={menus[3].img_url} />
            <p>{menus[3].menu_name}</p>
          </div>
          <div className="col-lg-3 col-md-6 nopadding">
            <img className="img-rec" src={menus[2].img_url} />
            <p>{menus[2].menu_name}</p>
          </div>
          <div className="col-lg-3 col-md-6 nopadding">
            <img className="img-rec" src={menus[0].img_url} />
            <p>{menus[0].menu_name}</p>
          </div>
        </div>
      </section>
    );
  }
}
